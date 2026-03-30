import { Question, getRandomQuestion } from './questions'

export type AgentType = 'demo' | 'external'

export type Agent = {
  id: string
  name: string
  wallet: string
  type: AgentType
  balance: number // in cents (mock for now)
  correct: number
  wrong: number
  earnings: number
}

export type Round = {
  id: string
  question: Question
  startedAt: number
  endsAt: number
  submissions: Map<string, { agentId: string; answer: string; paidAt: number }>
  settled: boolean
  pool: number // total paid in (cents)
  winners: string[]
}

export type PaymentEvent = {
  agentId: string
  agentName: string
  agentType: AgentType
  action: '402_challenged' | 'paid' | 'answer_accepted' | 'answer_rejected'
  amount?: string
  timestamp: number
}

export type ArenaState = {
  agents: Map<string, Agent>
  currentRound: Round | null
  pastRounds: Round[]
  roundNumber: number
  paymentLog: PaymentEvent[]
}

const ROUND_DURATION_MS = 15_000
const ENTRY_FEE_CENTS = 5 // $0.05 per answer

const MAX_PAYMENT_LOG = 50

// Singleton arena state (in-memory)
const state: ArenaState = {
  agents: new Map(),
  currentRound: null,
  pastRounds: [],
  roundNumber: 0,
  paymentLog: [],
}

export function logPayment(event: PaymentEvent) {
  state.paymentLog.push(event)
  if (state.paymentLog.length > MAX_PAYMENT_LOG) {
    state.paymentLog = state.paymentLog.slice(-MAX_PAYMENT_LOG)
  }
}

export function getPaymentLog(): PaymentEvent[] {
  return state.paymentLog
}

export function getState(): ArenaState {
  return state
}

export function registerAgent(name: string, wallet: string, type: AgentType = 'external'): Agent {
  const id = `agent-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
  const agent: Agent = { id, name, wallet, type, balance: 100, correct: 0, wrong: 0, earnings: 0 }
  state.agents.set(id, agent)
  return agent
}

export function startRound(): Round {
  const usedIds = state.pastRounds.map(r => r.question.id)
  const question = getRandomQuestion(usedIds)
  const now = Date.now()

  const round: Round = {
    id: `round-${++state.roundNumber}`,
    question,
    startedAt: now,
    endsAt: now + ROUND_DURATION_MS,
    submissions: new Map(),
    settled: false,
    pool: 0,
    winners: [],
  }

  state.currentRound = round
  return round
}

export function submitAnswer(
  agentId: string,
  answer: string,
  mppVerified = false,
): { accepted: boolean; reason?: string } {
  const round = state.currentRound
  if (!round) return { accepted: false, reason: 'No active round' }
  if (Date.now() > round.endsAt) return { accepted: false, reason: 'Round expired' }
  if (round.submissions.has(agentId)) return { accepted: false, reason: 'Already submitted' }

  const agent = state.agents.get(agentId)
  if (!agent) return { accepted: false, reason: 'Unknown agent' }

  // When MPP has verified the on-chain payment, skip simulated balance check
  if (!mppVerified) {
    if (agent.balance < ENTRY_FEE_CENTS) return { accepted: false, reason: 'Insufficient balance' }
    agent.balance -= ENTRY_FEE_CENTS
  }

  round.pool += ENTRY_FEE_CENTS
  round.submissions.set(agentId, { agentId, answer, paidAt: Date.now() })

  return { accepted: true }
}

export function settleRound(): { winners: string[]; payoutPerWinner: number } {
  const round = state.currentRound
  if (!round || round.settled) return { winners: [], payoutPerWinner: 0 }

  const correctAnswer = round.question.answer.toLowerCase().trim()
  const winners: string[] = []

  for (const [agentId, sub] of round.submissions) {
    const agent = state.agents.get(agentId)
    if (!agent) continue

    if (sub.answer.toLowerCase().trim() === correctAnswer) {
      winners.push(agentId)
      agent.correct++
    } else {
      agent.wrong++
    }
  }

  const payoutPerWinner = winners.length > 0 ? Math.floor(round.pool / winners.length) : 0

  for (const agentId of winners) {
    const agent = state.agents.get(agentId)
    if (agent) {
      agent.balance += payoutPerWinner
      agent.earnings += payoutPerWinner - ENTRY_FEE_CENTS
    }
  }

  round.settled = true
  round.winners = winners
  state.pastRounds.push(round)
  state.currentRound = null

  return { winners, payoutPerWinner }
}

export function getLeaderboard(): Agent[] {
  return Array.from(state.agents.values()).sort((a, b) => b.earnings - a.earnings)
}

export function serializeRound(round: Round) {
  return {
    id: round.id,
    question: {
      id: round.question.id,
      question: round.question.question,
      choices: round.question.choices,
      category: round.question.category,
    },
    startedAt: round.startedAt,
    endsAt: round.endsAt,
    submissionCount: round.submissions.size,
    pool: round.pool,
    settled: round.settled,
    winners: round.winners,
  }
}
