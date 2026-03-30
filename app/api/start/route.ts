import { NextRequest, NextResponse } from 'next/server'
import { startAgentRunner } from '@/lib/agents/runner'

let started = false

// Start demo bots: GET /api/start?demo=true
// Without ?demo=true, just returns status
export async function GET(req: NextRequest) {
  const wantDemo = req.nextUrl.searchParams.get('demo') === 'true'

  if (wantDemo && !started) {
    started = true
    startAgentRunner().catch(console.error)
    return NextResponse.json({ ok: true, demoBots: 'started' })
  }

  return NextResponse.json({ ok: true, demoBots: started ? 'running' : 'off' })
}
