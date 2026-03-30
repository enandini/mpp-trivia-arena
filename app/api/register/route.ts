import { NextRequest, NextResponse } from 'next/server'
import { registerAgent } from '@/lib/arena'
import type { AgentType } from '@/lib/arena'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, wallet, type } = body

  if (!name) {
    return NextResponse.json({ error: 'Missing agent name' }, { status: 400 })
  }

  const agentType: AgentType = type === 'demo' ? 'demo' : 'external'
  const agent = registerAgent(name, wallet || `0x${Math.random().toString(16).slice(2).padEnd(40, '0')}`, agentType)
  return NextResponse.json(agent)
}
