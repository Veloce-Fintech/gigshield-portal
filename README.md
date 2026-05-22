# GigShield Portal

Human interface for gig economy escrow, payments, and cross-border withdrawals on Stellar.

## Views

### Freelancer Dashboard (`/freelancer`)

- Live milestone tracker with countdown timers on escrow deadlines
- Escrow status overview (active, completed, disputed)
- **Withdraw to Local Bank** — SEP-24 anchor integration via Yellow Card (Africa) and Anclap (LATAM)
- Real-time balance and progress tracking per escrow

### Enterprise Invoice Builder (`/enterprise`)

- Dynamic invoice table for funding multiple contractor milestones in one batch
- Per-contractor input: Stellar address, milestone description, amount, token, deadline
- **Fund All via Freighter** — single-click batch funding using Freighter Wallet on Stellar Testnet
- Transaction confirmation with Stellar Expert link

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 + Shadcn/ui (Base UI)
- **Wallet:** Freighter Browser Extension
- **Blockchain:** Stellar Testnet (Soroban)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Connect Freighter wallet to enable funding actions.

## Project Structure

```
src/
├── app/
│   ├── freelancer/page.tsx    # Freelancer dashboard with milestones + withdraw
│   └── enterprise/page.tsx    # Invoice builder for batch milestone funding
├── components/
│   ├── sidebar.tsx            # Navigation sidebar
│   ├── wallet-connect.tsx     # Freighter wallet connection
│   ├── milestone-card.tsx     # Milestone list + countdown + summary cards
│   ├── withdraw-dialog.tsx    # SEP-24 anchor withdrawal dialog
│   └── ui/                   # Shadcn/ui components
└── lib/
    ├── stellar.ts             # Freighter API wrapper
    └── mock-data.ts           # Escrow, milestone, anchor sample data
```
