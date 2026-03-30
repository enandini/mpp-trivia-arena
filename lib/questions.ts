export type Question = {
  id: string
  question: string
  answer: string
  choices: string[]
  category: string
  difficulty: 'hard' | 'very-hard'
}

export const QUESTIONS: Question[] = [
  // TERRA / LUNA
  {
    id: 'terra-1',
    question: 'What fixed deposit yield did Anchor Protocol offer on UST at launch?',
    answer: '~20% APY',
    choices: ['~20% APY', '~15% APY', '~25% APY', '~10% APY'],
    category: 'Terra/LUNA',
    difficulty: 'hard',
  },
  {
    id: 'terra-2',
    question: 'Approximately how much BTC did the Luna Foundation Guard accumulate as a UST peg reserve?',
    answer: '~80,394 BTC',
    choices: ['~80,394 BTC', '~20,000 BTC', '~150,000 BTC', '~45,000 BTC'],
    category: 'Terra/LUNA',
    difficulty: 'very-hard',
  },
  {
    id: 'terra-3',
    question: 'What Columbus-5 upgrade change made the LUNA death spiral worse during the UST collapse?',
    answer: 'All LUNA burned during UST minting (no seigniorage buffer)',
    choices: [
      'All LUNA burned during UST minting (no seigniorage buffer)',
      'Removed validator slashing penalties',
      'Increased UST mint cap to unlimited',
      'Disabled the on-chain swap module',
    ],
    category: 'Terra/LUNA',
    difficulty: 'very-hard',
  },
  {
    id: 'terra-4',
    question: 'Which Curve pool became a key indicator of the UST depeg event in May 2022?',
    answer: 'UST-3CRV pool',
    choices: ['UST-3CRV pool', 'UST-FRAX pool', 'UST-USDC pool', 'UST-DAI pool'],
    category: 'Terra/LUNA',
    difficulty: 'hard',
  },
  {
    id: 'terra-5',
    question: 'What was Do Kwon\'s previous startup before co-founding Terraform Labs?',
    answer: 'Anyfi',
    choices: ['Anyfi', 'Dapr', 'Chai', 'Blockstack'],
    category: 'Terra/LUNA',
    difficulty: 'very-hard',
  },

  // COSMOS
  {
    id: 'cosmos-1',
    question: 'What fraction of voting power must sign a block for Tendermint to commit it?',
    answer: 'Greater than 2/3',
    choices: ['Greater than 2/3', 'Greater than 1/2', 'Greater than 3/4', 'Exactly 2/3'],
    category: 'Cosmos',
    difficulty: 'hard',
  },
  {
    id: 'cosmos-2',
    question: 'What is the unbonding period for staked ATOM on the Cosmos Hub?',
    answer: '21 days',
    choices: ['21 days', '7 days', '14 days', '28 days'],
    category: 'Cosmos',
    difficulty: 'hard',
  },
  {
    id: 'cosmos-3',
    question: 'What was the first consumer chain to launch using Cosmos Interchain Security (Replicated Security)?',
    answer: 'Neutron',
    choices: ['Neutron', 'Stride', 'Osmosis', 'Kujira'],
    category: 'Cosmos',
    difficulty: 'very-hard',
  },
  {
    id: 'cosmos-4',
    question: 'How much did the Cosmos ICO raise in April 2017, and how fast did it sell out?',
    answer: '~$17.3M in under 30 minutes',
    choices: ['~$17.3M in under 30 minutes', '~$50M in 2 hours', '~$5M in 1 hour', '~$100M in 3 days'],
    category: 'Cosmos',
    difficulty: 'very-hard',
  },
  {
    id: 'cosmos-5',
    question: 'In IBC, can a relayer forge or tamper with packets?',
    answer: 'No -- destination chain verifies Merkle proofs against source chain light client',
    choices: [
      'No -- destination chain verifies Merkle proofs against source chain light client',
      'Yes -- relayers have signing authority over packets',
      'Only if the relayer controls >33% of validators',
      'Yes but only for cross-chain token transfers',
    ],
    category: 'Cosmos',
    difficulty: 'hard',
  },

  // CELESTIA
  {
    id: 'celestia-1',
    question: 'What erasure coding scheme does Celestia use for Data Availability Sampling?',
    answer: '2D Reed-Solomon (k×k matrix extended to 2k×2k)',
    choices: [
      '2D Reed-Solomon (k×k matrix extended to 2k×2k)',
      '1D Reed-Solomon across rows only',
      'Turbo codes with interleaved parity',
      'XOR-based erasure coding',
    ],
    category: 'Celestia',
    difficulty: 'hard',
  },
  {
    id: 'celestia-2',
    question: 'How many random samples does a Celestia light node need to achieve ~99% confidence of data availability?',
    answer: '~15 samples',
    choices: ['~15 samples', '~50 samples', '~100 samples', '~7 samples'],
    category: 'Celestia',
    difficulty: 'very-hard',
  },
  {
    id: 'celestia-3',
    question: 'What was Celestia\'s original project name, and who wrote the original paper?',
    answer: 'LazyLedger -- Mustafa Al-Bassam',
    choices: [
      'LazyLedger -- Mustafa Al-Bassam',
      'DataChain -- Vitalik Buterin',
      'ModularDA -- Ismail Khoffi',
      'AvailNet -- John Adler',
    ],
    category: 'Celestia',
    difficulty: 'hard',
  },
  {
    id: 'celestia-4',
    question: 'When did Celestia Mainnet Beta launch?',
    answer: 'October 31, 2023',
    choices: ['October 31, 2023', 'March 15, 2023', 'January 1, 2024', 'June 20, 2023'],
    category: 'Celestia',
    difficulty: 'very-hard',
  },
  {
    id: 'celestia-5',
    question: 'What is the fundamental data unit size in Celestia?',
    answer: '512 bytes (one share)',
    choices: ['512 bytes (one share)', '1 KB', '256 bytes', '4 KB'],
    category: 'Celestia',
    difficulty: 'very-hard',
  },

  // PARALLEL EXECUTION
  {
    id: 'parallel-1',
    question: 'What happens when Monad\'s optimistic parallel executor detects a state conflict between transactions?',
    answer: 'The affected transaction is re-executed with updated state',
    choices: [
      'The affected transaction is re-executed with updated state',
      'Both transactions are dropped and resubmitted',
      'The block is reverted and re-proposed',
      'The conflicting transaction is skipped entirely',
    ],
    category: 'Parallel Execution',
    difficulty: 'hard',
  },
  {
    id: 'parallel-2',
    question: 'Why did Monad build MonadDB instead of using RocksDB?',
    answer: 'RocksDB uses synchronous I/O which blocks threads; MonadDB uses async I/O (io_uring) for parallel state reads',
    choices: [
      'RocksDB uses synchronous I/O which blocks threads; MonadDB uses async I/O (io_uring) for parallel state reads',
      'RocksDB doesn\'t support EVM state trie format',
      'RocksDB has a GPL license incompatible with Monad',
      'RocksDB doesn\'t support concurrent writes from multiple threads',
    ],
    category: 'Parallel Execution',
    difficulty: 'very-hard',
  },
  {
    id: 'parallel-3',
    question: 'How does Solana\'s Sealevel runtime enable parallel execution?',
    answer: 'Transactions must pre-declare all accounts they read/write; disjoint account sets execute in parallel',
    choices: [
      'Transactions must pre-declare all accounts they read/write; disjoint account sets execute in parallel',
      'Transactions are grouped by program ID and batched',
      'Sealevel uses optimistic execution with conflict rollback',
      'Block producers assign transactions to shards randomly',
    ],
    category: 'Parallel Execution',
    difficulty: 'hard',
  },
  {
    id: 'parallel-4',
    question: 'What is the key architectural difference between Sei v2 and Monad\'s approach to parallel execution?',
    answer: 'Sei v2 runs on Cosmos SDK with CometBFT; Monad is ground-up EVM-equivalent L1 with custom consensus and database',
    choices: [
      'Sei v2 runs on Cosmos SDK with CometBFT; Monad is ground-up EVM-equivalent L1 with custom consensus and database',
      'Sei v2 uses pessimistic locking; Monad uses optimistic execution',
      'Sei v2 is ZK-based; Monad uses fraud proofs',
      'Sei v2 requires pre-declared accounts; Monad does not',
    ],
    category: 'Parallel Execution',
    difficulty: 'very-hard',
  },
  {
    id: 'parallel-5',
    question: 'What is Block-STM (used by Aptos) and how does it differ from Solana\'s approach?',
    answer: 'Block-STM doesn\'t require pre-declared dependencies; uses multi-version data structure and re-executes on conflicts',
    choices: [
      'Block-STM doesn\'t require pre-declared dependencies; uses multi-version data structure and re-executes on conflicts',
      'Block-STM requires pre-declared accounts like Solana but uses STM for write batching',
      'Block-STM is a sharding model where each shard runs Block-STM locally',
      'Block-STM uses ZK proofs to verify parallel execution correctness',
    ],
    category: 'Parallel Execution',
    difficulty: 'very-hard',
  },

  // ICO HISTORY
  {
    id: 'ico-1',
    question: 'What was the ETH price during the Ethereum crowdsale in summer 2014?',
    answer: '~$0.30 per ETH (2,000 ETH per BTC initially)',
    choices: ['~$0.30 per ETH (2,000 ETH per BTC initially)', '~$1.00 per ETH', '~$0.10 per ETH', '~$5.00 per ETH'],
    category: 'ICO History',
    difficulty: 'hard',
  },
  {
    id: 'ico-2',
    question: 'How much did the EOS year-long ICO raise, making it the largest in history?',
    answer: '~$4.1 billion',
    choices: ['~$4.1 billion', '~$1.5 billion', '~$700 million', '~$2.3 billion'],
    category: 'ICO History',
    difficulty: 'hard',
  },
  {
    id: 'ico-3',
    question: 'The Filecoin ICO in 2017 used what legal structure, and when did the network actually launch?',
    answer: 'SAFT (Simple Agreement for Future Tokens) -- launched October 2020',
    choices: [
      'SAFT (Simple Agreement for Future Tokens) -- launched October 2020',
      'Reg D 506(c) offering -- launched January 2019',
      'Cayman Islands foundation token sale -- launched March 2021',
      'Dutch auction -- launched December 2018',
    ],
    category: 'ICO History',
    difficulty: 'hard',
  },
  {
    id: 'ico-4',
    question: 'What was the core dispute that delayed the Tezos network launch by about a year after its $232M ICO?',
    answer: 'Co-founder dispute with Tezos Foundation president Johann Gevers who refused to disburse funds',
    choices: [
      'Co-founder dispute with Tezos Foundation president Johann Gevers who refused to disburse funds',
      'SEC investigation halting token distribution',
      'Smart contract bug locking ICO proceeds',
      'Patent dispute with a competing blockchain project',
    ],
    category: 'ICO History',
    difficulty: 'very-hard',
  },
  {
    id: 'ico-5',
    question: 'The DAO crowdsale in 2016 attracted approximately what percentage of all ETH in circulation?',
    answer: '~14%',
    choices: ['~14%', '~5%', '~25%', '~30%'],
    category: 'ICO History',
    difficulty: 'very-hard',
  },

  // DEFI
  {
    id: 'defi-1',
    question: 'In Curve Wars, why did protocols bribe vlCVX holders rather than direct veCRV holders?',
    answer: 'Convex accumulated massive veCRV; controlling vlCVX = controlling where Convex votes its veCRV (gauge weights)',
    choices: [
      'Convex accumulated massive veCRV; controlling vlCVX = controlling where Convex votes its veCRV (gauge weights)',
      'vlCVX had higher voting multiplier than veCRV per dollar',
      'veCRV holders were legally restricted from accepting bribes',
      'Convex locked all veCRV making it illiquid and un-briable directly',
    ],
    category: 'DeFi',
    difficulty: 'hard',
  },
  {
    id: 'defi-2',
    question: 'In Aave, at what health factor does liquidation trigger?',
    answer: 'Below 1.0',
    choices: ['Below 1.0', 'Below 1.5', 'Below 0.8', 'Below 1.2'],
    category: 'DeFi',
    difficulty: 'hard',
  },
  {
    id: 'defi-3',
    question: 'What is "ve(3,3)" and where does the "(3,3)" reference come from?',
    answer: 'Combines Curve ve-tokenomics with OlympusDAO game theory payoff matrix (mutual staking = optimal outcome)',
    choices: [
      'Combines Curve ve-tokenomics with OlympusDAO game theory payoff matrix (mutual staking = optimal outcome)',
      'Refers to the 3 voting epochs and 3 fee tiers in the original Solidly design',
      'Three types of value (fees, bribes, rebases) locked for 3 years',
      'Version 3.3 of the Curve tokenomics spec',
    ],
    category: 'DeFi',
    difficulty: 'very-hard',
  },
  {
    id: 'defi-4',
    question: 'What happened during MakerDAO\'s "Black Thursday" in March 2020?',
    answer: 'ETH crashed 50%; liquidation bots failed due to gas congestion; vaults auctioned for 0 DAI; ~$5.67M bad debt',
    choices: [
      'ETH crashed 50%; liquidation bots failed due to gas congestion; vaults auctioned for 0 DAI; ~$5.67M bad debt',
      'A governance attack passed a malicious proposal draining the surplus buffer',
      'A reentrancy bug in the Vault contract was exploited for $8M',
      'Oracle manipulation caused mass false liquidations',
    ],
    category: 'DeFi',
    difficulty: 'very-hard',
  },
  {
    id: 'defi-5',
    question: 'The first bZx flash loan attack in February 2020 used which protocols in sequence?',
    answer: 'dYdX flash loan → Compound collateral → Fulcrum short → Uniswap price manipulation',
    choices: [
      'dYdX flash loan → Compound collateral → Fulcrum short → Uniswap price manipulation',
      'Aave flash loan → Curve pool manipulation → Fulcrum liquidation',
      'Uniswap flash swap → MakerDAO vault → bZx long → Balancer exit',
      'dYdX flash loan → bZx margin trade → Kyber oracle manipulation',
    ],
    category: 'DeFi',
    difficulty: 'very-hard',
  },

  // STABLECOINS
  {
    id: 'stable-1',
    question: 'How much USDC reserves were held at Silicon Valley Bank during the March 2023 depeg?',
    answer: '$3.3 billion',
    choices: ['$3.3 billion', '$1 billion', '$8 billion', '$500 million'],
    category: 'Stablecoins',
    difficulty: 'hard',
  },
  {
    id: 'stable-2',
    question: 'What is the minimum collateralization ratio for ETH-A vaults in MakerDAO?',
    answer: '150%',
    choices: ['150%', '125%', '175%', '200%'],
    category: 'Stablecoins',
    difficulty: 'hard',
  },
  {
    id: 'stable-3',
    question: 'What did Tether\'s first detailed reserve attestation (March 2021) reveal as its largest reserve category?',
    answer: '~49% commercial paper',
    choices: ['~49% commercial paper', '~60% US Treasury bills', '~45% bank deposits', '~55% repo agreements'],
    category: 'Stablecoins',
    difficulty: 'hard',
  },
  {
    id: 'stable-4',
    question: 'Frax\'s "fractional-algorithmic" design dynamically adjusted what parameter to maintain the peg?',
    answer: 'Collateral ratio (CR) -- increases when FRAX < $1, decreases when FRAX > $1',
    choices: [
      'Collateral ratio (CR) -- increases when FRAX < $1, decreases when FRAX > $1',
      'FXS burn rate -- more FXS burned when below peg',
      'USDC allocation -- more USDC added when below peg',
      'Stability fee -- raised when FRAX > $1 to reduce supply',
    ],
    category: 'Stablecoins',
    difficulty: 'hard',
  },

  // ETHEREUM HISTORY
  {
    id: 'eth-1',
    question: 'At what block number did EIP-1559 activate on Ethereum?',
    answer: '12,965,000 (London fork, August 5, 2021)',
    choices: ['12,965,000 (London fork, August 5, 2021)', '10,000,000', '13,500,000', '15,537,394'],
    category: 'Ethereum',
    difficulty: 'hard',
  },
  {
    id: 'eth-2',
    question: 'By what parameter did the Ethereum Merge trigger (not a block number)?',
    answer: 'Terminal Total Difficulty (TTD) of 58,750,000,000,000,000,000,000',
    choices: [
      'Terminal Total Difficulty (TTD) of 58,750,000,000,000,000,000,000',
      'Block timestamp after September 14, 2022 00:00 UTC',
      'Block 15,537,394 by committee vote',
      'Total ETH staked exceeding 13.5M ETH',
    ],
    category: 'Ethereum',
    difficulty: 'very-hard',
  },
  {
    id: 'eth-3',
    question: 'What does EIP-4844 (Proto-Danksharding) introduce, and how much did it reduce L2 fees?',
    answer: 'Blob transactions with KZG commitments; L2 fees dropped 90-99% after Dencun (March 2024)',
    choices: [
      'Blob transactions with KZG commitments; L2 fees dropped 90-99% after Dencun (March 2024)',
      'Full danksharding with 64 shards; L2 fees dropped ~50% after Cancun (2023)',
      'Verkle tries replacing MPT; reduced state access costs ~40% after Shanghai',
      'ZK-EVM integration; L2 fees dropped ~80% after Deneb upgrade',
    ],
    category: 'Ethereum',
    difficulty: 'hard',
  },
  {
    id: 'eth-4',
    question: 'What minimum stake is required to become an Ethereum validator, and how many slashable offenses exist?',
    answer: '32 ETH; 3 slashable offenses (double vote, surround vote, proposer equivocation)',
    choices: [
      '32 ETH; 3 slashable offenses (double vote, surround vote, proposer equivocation)',
      '32 ETH; 1 slashable offense (double signing)',
      '16 ETH; 2 slashable offenses',
      '64 ETH; 3 slashable offenses',
    ],
    category: 'Ethereum',
    difficulty: 'hard',
  },
  {
    id: 'eth-5',
    question: 'What was the Spurious Dragon fork\'s most lasting impact on smart contracts?',
    answer: 'EIP-170: contract code size limit of 24,576 bytes',
    choices: [
      'EIP-170: contract code size limit of 24,576 bytes',
      'EIP-155: replay protection via chain ID',
      'EIP-161: clearing empty accounts from state trie',
      'EIP-160: increased EXP opcode gas cost',
    ],
    category: 'Ethereum',
    difficulty: 'very-hard',
  },
  {
    id: 'eth-6',
    question: 'When did the Ethereum Beacon Chain launch, and how long did it run before the Merge?',
    answer: 'December 1, 2020 -- ran ~21.5 months in parallel before the Merge',
    choices: [
      'December 1, 2020 -- ran ~21.5 months in parallel before the Merge',
      'January 1, 2021 -- ran ~20 months',
      'September 15, 2021 -- ran ~12 months',
      'June 30, 2020 -- ran ~27 months',
    ],
    category: 'Ethereum',
    difficulty: 'hard',
  },

  // ADVANCED / CROSS-CUTTING
  {
    id: 'adv-1',
    question: 'Who coined "Maximal Extractable Value" (MEV), and what was it originally called?',
    answer: 'Phil Daian et al. (Flash Boys 2.0, 2019); originally "Miner Extractable Value"',
    choices: [
      'Phil Daian et al. (Flash Boys 2.0, 2019); originally "Miner Extractable Value"',
      'Vitalik Buterin (2020 blog post); originally "Block Producer Value"',
      'Robert Miller (Flashbots, 2020); originally "Searcher Extractable Value"',
      'Dan Robinson & Georgios Konstantopoulos; originally "Dark Forest Value"',
    ],
    category: 'Advanced',
    difficulty: 'hard',
  },
  {
    id: 'adv-2',
    question: 'In proposer-builder separation (PBS), what does a proposer receive from a relay -- full block or just a header?',
    answer: 'Just a header (blind signing) -- full block revealed only after proposer commits',
    choices: [
      'Just a header (blind signing) -- full block revealed only after proposer commits',
      'The full block with a validity proof attached',
      'An encrypted block that gets decrypted post-slot',
      'A Merkle root of included transactions',
    ],
    category: 'Advanced',
    difficulty: 'hard',
  },
  {
    id: 'adv-3',
    question: 'What was the Parity Multisig wallet freeze of November 2017?',
    answer: 'User accidentally self-destructed the shared library contract, permanently freezing ~513,774 ETH across 587 wallets',
    choices: [
      'User accidentally self-destructed the shared library contract, permanently freezing ~513,774 ETH across 587 wallets',
      'A reentrancy exploit drained $150M from Parity multisig wallets',
      'A governance key was compromised, allowing an attacker to upgrade and drain the library',
      'An integer overflow bug allowed the attacker to mint unlimited ETH from the multisig',
    ],
    category: 'Advanced',
    difficulty: 'very-hard',
  },
  {
    id: 'adv-4',
    question: 'What is the key difference in trust assumptions between zk-SNARKs and zk-STARKs?',
    answer: 'SNARKs require trusted setup (toxic waste); STARKs are transparent (no trusted setup, hash-based)',
    choices: [
      'SNARKs require trusted setup (toxic waste); STARKs are transparent (no trusted setup, hash-based)',
      'STARKs require trusted setup; SNARKs use recursive proofs that eliminate it',
      'Both require trusted setup; STARKs just have a more secure ceremony',
      'Neither requires trusted setup; the difference is only in proof size',
    ],
    category: 'Advanced',
    difficulty: 'hard',
  },
  {
    id: 'adv-5',
    question: 'The Verifier\'s Dilemma describes why rational nodes skip verification. How does this connect to rollup data availability?',
    answer: 'Without data posted onchain/DA layer, verifiers can\'t challenge invalid state transitions even if they wanted to',
    choices: [
      'Without data posted onchain/DA layer, verifiers can\'t challenge invalid state transitions even if they wanted to',
      'Verifiers won\'t challenge because fraud proof windows are too short to be profitable',
      'Verifiers skip DA checks because the sequencer bond is sufficient economic deterrent',
      'The dilemma is resolved by ZK proofs which don\'t require data availability',
    ],
    category: 'Advanced',
    difficulty: 'very-hard',
  },
]

export function getRandomQuestion(excludeIds: string[] = []): Question {
  const available = QUESTIONS.filter(q => !excludeIds.includes(q.id))
  const pool = available.length > 0 ? available : QUESTIONS
  return pool[Math.floor(Math.random() * pool.length)]
}
