import { PublicKey } from '@solana/web3.js';

export const categories: string[] = [
  'Liquidity Provision',
  'Lending',
  'Staking',
  'Yield Farming',
  'Auto-Compounding',
  'Stablecoin',
  'Cross-Chain',
  'R.W.A',
  'Governance Token',
];

export const riskLevel: string[] = ['Low', 'Average', 'Medium', 'High', 'Degen'];
export const DEFAULT_INVESTMENT = { investmentAmount: '', investmentType: '', duration: '', category: '' };
export const SOL_RATE = 0.27;

export const USER_SEED = 'user';
export const INVESTMENT_SEED = 'investment';
export const TICKET_SEED = 'ticket';
export const PROGRAM_ID = new PublicKey('Ci8eXVnCAn4EHXTq228o1BjhuTKza6gwn1hn6kJzWuJ9');
