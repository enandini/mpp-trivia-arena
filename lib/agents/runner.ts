/**
 * Agent runner -- simulates agents competing in the arena.
 *
 * Each agent has its own mppx client instance (polyfill:false) so they
 * each carry their own wallet and handle 402 payment challenges independently.
 *
 * Flow per agent per round:
 *   1. GET /api/arena -- check current question
 *   2. POST /api/answer -- mppx client intercepts 402, pays, retries automatically
 */

import Anthropic from '@anthropic-ai/sdk'
import { Mppx, tempo } from 'mppx/client'
import { privateKeyToAccount } from 'viem/accounts'

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export type AgentStrategy = 'random' | 'claude' | 'fast'

type AgentDef = {
  id: string
  name: string
  strategy: AgentStrategy
  fetch: typeof globalThis.fetch
}

let demoAgents: AgentDef[] = []
let isRunning = false

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Read agent private keys from env
const AGENT_KEYS = [
  process.env.AGENT_0_KEY,
  process.env.AGENT_1_KEY,
  process.env.AGENT_2_KEY,
  process.env.AGENT_3_KEY,
] as const

const STRATEGIES: AgentStrategy[] = ['random', 'claude', 'fast', 'random']
const NAMES = ['RandomBot', 'ClaudeAgent', 'FastBot', 'RandomBot2']

function createMppxFetch(privateKey: string): typeof globalThis.fetch {
  const account = privateKeyToAccount(privateKey as `0x${string}`)
  const client = Mppx.create({
    methods: [tempo({ account })],
    polyfill: false, // don't patch global fetch -- use client.fetch per agent
  })
  return client.fetch as typeof globalThis.fetch
}

async function registerDemoAgents() {
  demoAgents = []

  for (let i = 0; i < NAMES.length; i++) {
    const key = AGENT_KEYS[i]
    const res = await fetch(`${BASE}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: NAMES[i], type: 'demo' }),
    })
    const agent = await res.json()

    // Each agent gets its own payment-aware fetch
    const agentFetch = key ? createMppxFetch(key) : globalThis.fetch

    demoAgents.push({
      id: agent.id,
      name: NAMES[i],
      strategy: STRATEGIES[i],
      fetch: agentFetch,
    })
  }
}

async function pickAnswer(strategy: AgentStrategy, question: string, choices: string[]): Promise<string> {
  if (strategy === 'random') {
    return choices[Math.floor(Math.random() * choices.length)]
  }

  if (strategy === 'fast') {
    return choices[0]
  }

  if (strategy === 'claude') {
    try {
      const msg = await anthropic.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 64,
        messages: [{
          role: 'user',
          content: `You are playing crypto trivia. Answer with ONLY the exact text of the correct choice, nothing else.

Question: ${question}
Choices:
${choices.map((c, i) => `${i + 1}. ${c}`).join('\n')}

Reply with the exact text of the correct answer.`,
        }],
      })
      const raw = (msg.content[0] as { text: string }).text.trim()
      const match = choices.find(c => raw.includes(c) || c.includes(raw.slice(0, 20)))
      return match || choices[Math.floor(Math.random() * choices.length)]
    } catch {
      return choices[Math.floor(Math.random() * choices.length)]
    }
  }

  return choices[0]
}

async function runTick() {
  try {
    const res = await fetch(`${BASE}/api/arena`)
    const data = await res.json()

    if (!data.round || data.round.settled) return

    const { question, choices } = data.round.question
    const timeLeft = data.round.endsAt - Date.now()
    if (timeLeft < 1000) return

    for (const agent of demoAgents) {
      const delay = Math.random() * Math.min(timeLeft - 1000, 8000)
      setTimeout(async () => {
        try {
          const answer = await pickAnswer(agent.strategy, question, choices)
          // agent.fetch handles 402 automatically -- pays via MPP and retries
          await agent.fetch(`${BASE}/api/answer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ agentId: agent.id, answer }),
          })
        } catch (e) {
          console.error(`[${agent.name}] answer error:`, e)
        }
      }, delay)
    }
  } catch (e) {
    console.error('[runner tick]', e)
  }
}

export async function startAgentRunner() {
  if (isRunning) return
  isRunning = true
  await registerDemoAgents()
  console.log('[runner] Agents registered:', demoAgents.map(a => `${a.name}(${a.id})`))
  setInterval(runTick, 3000)
}
