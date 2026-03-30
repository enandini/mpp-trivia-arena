'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

type Question = {
  id: string
  question: string
  choices: string[]
  category: string
}

type Round = {
  id: string
  question: Question
  startedAt: number
  endsAt: number
  submissionCount: number
  pool: number
  settled: boolean
  winners: string[]
}

type Agent = {
  id: string
  name: string
  type: 'demo' | 'external'
  balance: number
  correct: number
  wrong: number
  earnings: number
}

type PaymentEvent = {
  agentId: string
  agentName: string
  agentType: 'demo' | 'external'
  action: '402_challenged' | 'paid' | 'answer_accepted' | 'answer_rejected'
  amount?: string
  timestamp: number
}

type ArenaData = {
  round: Round | null
  leaderboard: Agent[]
  roundNumber: number
  totalAgents: number
  paymentLog: PaymentEvent[]
}

function Countdown({ endsAt }: { endsAt: number }) {
  const [ms, setMs] = useState(endsAt - Date.now())

  useEffect(() => {
    const t = setInterval(() => setMs(endsAt - Date.now()), 100)
    return () => clearInterval(t)
  }, [endsAt])

  const secs = Math.max(0, Math.ceil(ms / 1000))
  const pct = Math.max(0, ms / 15000)
  const color = secs > 8 ? '#22c55e' : secs > 4 ? '#eab308' : '#ef4444'

  return (
    <div className="flex flex-col items-center gap-2">
      <span style={{ color, fontSize: '3rem', fontFamily: 'monospace', fontWeight: 700 }}>
        {secs}s
      </span>
      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-100"
          style={{ width: `${pct * 100}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

function categoryColor(cat: string) {
  const map: Record<string, string> = {
    'Terra/LUNA': '#ef4444',
    'Cosmos': '#8b5cf6',
    'Celestia': '#06b6d4',
    'Parallel Execution': '#f97316',
    'ICO History': '#eab308',
    'DeFi': '#22c55e',
    'Stablecoins': '#3b82f6',
    'Ethereum': '#a78bfa',
    'Advanced': '#ec4899',
  }
  return map[cat] || '#6b7280'
}

function actionLabel(action: PaymentEvent['action']): { text: string; color: string } {
  switch (action) {
    case '402_challenged': return { text: '402 PAYMENT REQUIRED', color: '#eab308' }
    case 'paid': return { text: 'PAID 0.05 USDC', color: '#3b82f6' }
    case 'answer_accepted': return { text: 'ANSWER ACCEPTED', color: '#22c55e' }
    case 'answer_rejected': return { text: 'REJECTED', color: '#ef4444' }
  }
}

function PaymentLog({ events }: { events: PaymentEvent[] }) {
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [events])

  return (
    <div className="border border-zinc-800 rounded-xl overflow-hidden mb-6">
      <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
        <span className="text-xs text-zinc-500 uppercase tracking-widest">mpp payment log</span>
        <span className="text-xs text-zinc-600">{events.length} events</span>
      </div>
      <div ref={logRef} className="max-h-48 overflow-y-auto">
        {events.length === 0 ? (
          <div className="px-4 py-4 text-center text-zinc-600 text-xs">waiting for payments...</div>
        ) : (
          <div className="divide-y divide-zinc-900">
            {events.map((ev, i) => {
              const label = actionLabel(ev.action)
              const time = new Date(ev.timestamp).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
              return (
                <div key={i} className="px-4 py-2 flex items-center gap-3 text-xs">
                  <span className="text-zinc-600 w-16 shrink-0">{time}</span>
                  <span className="font-semibold text-zinc-300">
                    {ev.agentName}
                    {ev.agentType === 'external' && (
                      <span className="ml-1.5 text-cyan-400 font-normal">ext</span>
                    )}
                  </span>
                  <span style={{ color: label.color }} className="font-mono">
                    {label.text}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Arena() {
  const [data, setData] = useState<ArenaData | null>(null)
  const [prevRound, setPrevRound] = useState<Round | null>(null)

  const poll = useCallback(async () => {
    const res = await fetch('/api/arena')
    const json: ArenaData = await res.json()
    setData(prev => {
      if (prev?.round && prev.round.id !== json.round?.id) {
        setPrevRound(prev.round)
      }
      return json
    })
  }, [])

  const [demoBots, setDemoBots] = useState(false)

  const toggleDemoBots = useCallback(async () => {
    if (!demoBots) {
      await fetch('/api/start?demo=true')
      setDemoBots(true)
    }
  }, [demoBots])

  useEffect(() => {
    poll()
    const t = setInterval(poll, 1000)
    return () => clearInterval(t)
  }, [poll])

  if (!data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500">
        connecting to arena...
      </div>
    )
  }

  const { round, leaderboard, roundNumber, paymentLog } = data
  const externalCount = leaderboard.filter(a => a.type === 'external').length

  return (
    <div className="min-h-screen bg-black text-white font-mono p-6" style={{ maxWidth: 900, margin: '0 auto' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">CRYPTO TRIVIA ARENA</h1>
          <p className="text-zinc-500 text-sm mt-1">agents compete. wrong answers fund the pool. right answers take it.</p>
        </div>
        <div className="text-right text-sm text-zinc-500">
          <div>round <span className="text-white font-bold">#{roundNumber}</span></div>
          <div>
            <span className="text-white font-bold">{data.totalAgents}</span> agents
            {externalCount > 0 && (
              <span className="text-cyan-400 ml-1">({externalCount} external)</span>
            )}
          </div>
          <button
            onClick={toggleDemoBots}
            disabled={demoBots}
            className="mt-2 px-3 py-1 text-xs rounded border transition-colors"
            style={{
              borderColor: demoBots ? '#3f3f46' : '#3b82f6',
              color: demoBots ? '#52525b' : '#3b82f6',
              cursor: demoBots ? 'default' : 'pointer',
            }}
          >
            {demoBots ? 'demo bots running' : 'start demo bots'}
          </button>
        </div>
      </div>

      {/* Active round */}
      {round && !round.settled ? (
        <div className="border border-zinc-800 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-xs px-2 py-1 rounded uppercase tracking-widest font-bold"
              style={{ backgroundColor: categoryColor(round.question.category) + '22', color: categoryColor(round.question.category) }}
            >
              {round.question.category}
            </span>
            <span className="text-xs text-zinc-500">{round.submissionCount} submissions &nbsp;|&nbsp; pool: ${(round.pool / 100).toFixed(2)}</span>
          </div>

          <p className="text-lg font-semibold leading-snug mb-6">{round.question.question}</p>

          <div className="grid grid-cols-1 gap-2 mb-6">
            {round.question.choices.map((c, i) => (
              <div key={i} className="border border-zinc-700 rounded-lg px-4 py-2 text-sm text-zinc-300">
                {c}
              </div>
            ))}
          </div>

          <Countdown endsAt={round.endsAt} />
        </div>
      ) : (
        <div className="border border-zinc-800 rounded-xl p-6 mb-6 text-center text-zinc-500">
          next round starting...
        </div>
      )}

      {/* Previous round result */}
      {prevRound && prevRound.settled && (
        <div className="border border-zinc-700 rounded-xl p-4 mb-6 bg-zinc-900">
          <div className="text-xs text-zinc-500 mb-1">last round result</div>
          <div className="text-sm">
            {prevRound.winners.length > 0 ? (
              <span className="text-green-400">
                {prevRound.winners.length} winner{prevRound.winners.length > 1 ? 's' : ''} split the ${(prevRound.pool / 100).toFixed(2)} pool
              </span>
            ) : (
              <span className="text-zinc-400">no correct answers -- pool carries over</span>
            )}
          </div>
        </div>
      )}

      {/* MPP Payment Log */}
      <PaymentLog events={paymentLog} />

      {/* Leaderboard */}
      <div className="border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-800 text-xs text-zinc-500 uppercase tracking-widest">
          leaderboard
        </div>
        {leaderboard.length === 0 ? (
          <div className="px-4 py-6 text-center text-zinc-600 text-sm">waiting for agents...</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-zinc-600 border-b border-zinc-800">
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">agent</th>
                <th className="px-4 py-2 text-right">correct</th>
                <th className="px-4 py-2 text-right">wrong</th>
                <th className="px-4 py-2 text-right">balance</th>
                <th className="px-4 py-2 text-right">net earnings</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((agent, i) => (
                <tr key={agent.id} className="border-b border-zinc-900 hover:bg-zinc-900">
                  <td className="px-4 py-3 text-zinc-600">{i + 1}</td>
                  <td className="px-4 py-3 font-semibold">
                    {agent.name}
                    {agent.type === 'external' ? (
                      <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-cyan-400/10 text-cyan-400 uppercase tracking-wider">ext</span>
                    ) : (
                      <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 uppercase tracking-wider">demo</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right text-green-400">{agent.correct}</td>
                  <td className="px-4 py-3 text-right text-red-400">{agent.wrong}</td>
                  <td className="px-4 py-3 text-right text-zinc-300">${(agent.balance / 100).toFixed(2)}</td>
                  <td className="px-4 py-3 text-right" style={{ color: agent.earnings >= 0 ? '#22c55e' : '#ef4444' }}>
                    {agent.earnings >= 0 ? '+' : ''}{(agent.earnings / 100).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p className="text-center text-zinc-700 text-xs mt-8">
        powered by MPP &mdash; agents pay to play, winners take the pool
      </p>
    </div>
  )
}
