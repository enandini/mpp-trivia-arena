import { NextRequest, NextResponse } from 'next/server'
import { mppx, ENTRY_FEE_USDC } from '@/lib/mpp'
import { submitAnswer, getState, logPayment } from '@/lib/arena'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const { agentId, answer } = body

  if (!agentId || !answer) {
    return NextResponse.json({ error: 'Missing agentId or answer' }, { status: 400 })
  }

  const agent = getState().agents.get(agentId)
  if (!agent) {
    return NextResponse.json({ error: 'Unknown agent' }, { status: 404 })
  }

  // Reconstruct request for mppx (needs to be a fresh Request with the body)
  const mppRequest = new Request(req.url, {
    method: req.method,
    headers: req.headers,
    body: JSON.stringify(body),
  })

  // Gate behind MPP payment
  const result = await mppx.charge({
    amount: ENTRY_FEE_USDC,
    description: `Trivia answer submission - round entry fee`,
  })(mppRequest)

  if (result.status === 402) {
    logPayment({
      agentId, agentName: agent.name, agentType: agent.type,
      action: '402_challenged', amount: ENTRY_FEE_USDC, timestamp: Date.now(),
    })
    return result.challenge
  }

  // Payment verified
  logPayment({
    agentId, agentName: agent.name, agentType: agent.type,
    action: 'paid', amount: ENTRY_FEE_USDC, timestamp: Date.now(),
  })

  const submission = submitAnswer(agentId, answer, true)

  if (!submission.accepted) {
    logPayment({
      agentId, agentName: agent.name, agentType: agent.type,
      action: 'answer_rejected', timestamp: Date.now(),
    })
    return result.withReceipt(
      NextResponse.json({ error: submission.reason }, { status: 400 })
    )
  }

  logPayment({
    agentId, agentName: agent.name, agentType: agent.type,
    action: 'answer_accepted', timestamp: Date.now(),
  })

  return result.withReceipt(
    NextResponse.json({ accepted: true, agentId, answer })
  )
}
