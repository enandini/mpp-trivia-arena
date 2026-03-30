import { NextResponse } from 'next/server'
import { getState, startRound, settleRound, serializeRound, getLeaderboard, getPaymentLog } from '@/lib/arena'

// GET -- current arena state
export async function GET() {
  const state = getState()
  const now = Date.now()

  // Auto-settle expired rounds
  if (state.currentRound && now > state.currentRound.endsAt && !state.currentRound.settled) {
    settleRound()
  }

  // Auto-start new round if none active (5s gap between rounds)
  const lastRound = state.pastRounds[state.pastRounds.length - 1]
  const gapOver = !lastRound || now > lastRound.endsAt + 5000
  if (!state.currentRound && gapOver) {
    startRound()
  }

  return NextResponse.json({
    round: state.currentRound ? serializeRound(state.currentRound) : null,
    leaderboard: getLeaderboard(),
    roundNumber: state.roundNumber,
    totalAgents: state.agents.size,
    paymentLog: getPaymentLog().slice(-20),
  })
}
