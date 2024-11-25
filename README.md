# SOON Hackathon Project 🚀

# SOONVault

A yield aggregator that automatically finds and invests in the best yield opportunities across DeFi protocols on SOON. Offer users strategies to maximize returns with minimal risk.

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Npm](https://docs.npmjs.com/cli/v6/commands/npm-install/)
- [Rust](https://www.rust-lang.org/)
- [Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html)

#### You will need the Devnet SOL to deploy the program, you can use our Bridge to get the Devnet SOL

```bash
https://bridge.devnet.soo.network/home
```

#### Also if you dont't have Sepolia ETH you can use the faucet

```bash
https://faucet.soo.network/
```

## Installation

1. Clone the repository

```bash
git clone https://github.com/Temitope3665/yield-aggregator
cd yield-aggregator
```

2. Install the dependencies and build the project

```bash
cd src/program-rust
cargo build-sbf
```

3. set-up the RPC URL for SOON Network

```bash
solana config set --url https://rpc.devnet.soo.network/rpc
```

5. Deploy the program to the SOON Network

```bash
solana program deploy ./smart-contract/target/deploy/aggregator.so
```

6. Once you have a deployed program, you can start interacting with it using the frontend, just cd to root directory and run the following commands:

```bash
cd front-end
npm i
npm dev
```

7. Open your browser and navigate to http://localhost:3000/
```

### Note: You need to change the programId in the frontend/src/components/hero.tsx file to the programId of the deployed program.

## Acknowledgments

This project is based on the [Solana Hello World example](https://github.com/Temitope3665/yield-aggregator/), and we would like to credit the Solana Labs team for providing the foundation for this implementation.
