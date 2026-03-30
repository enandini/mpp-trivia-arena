/**
 * Server-side MPP instance.
 * Singleton -- instantiated once at module load.
 *
 * Agents pay 0.05 USDC per answer submission.
 * feePayer:true means the server sponsors gas so agents only need tokens.
 */
import { Mppx, tempo } from 'mppx/server'

// Testnet USDC on Tempo Moderato (chain 42431)
const TESTNET_USDC = '0x20c0000000000000000000000000000000000000'

// Entry fee per answer: 0.05 USDC (6 decimals = 50000)
export const ENTRY_FEE_USDC = '0.05'

export const mppx = Mppx.create({
  methods: [
    tempo({
      currency: TESTNET_USDC,
      recipient: process.env.SERVER_ADDRESS! as `0x${string}`,
      feePayer: true,   // server sponsors gas -- agents only need USDC
      testnet: true,
    }),
  ],
  secretKey: process.env.MPP_SECRET_KEY!,
})
