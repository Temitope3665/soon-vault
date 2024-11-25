import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';
import { AnchorProvider, BN, Program } from '@project-serum/anchor';
import { IDL } from './idl';
import { PROGRAM_ID, INVESTMENT_SEED, TICKET_SEED, USER_SEED } from './constants';
import { PublicKey } from '@solana/web3.js';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authorFilter = (authorBase58PublicKey: any) => ({
  memcmp: {
    offset: 8,
    bytes: authorBase58PublicKey,
  },
});

export function convertToSOL(amount: number) {
  return amount * 1000000000;
}

export const getProgram = (connection: any, wallet: any) => {
  const provider = new AnchorProvider(connection, wallet, { commitment: 'confirmed' });
  const program = new Program(IDL, PROGRAM_ID, provider);
  return program;
};

export const getUserAddress = async () => {
  return (await PublicKey.findProgramAddress([Buffer.from(USER_SEED)], PROGRAM_ID))[0];
};

export const getInvestmentAddress = async (id: number) => {
  return (await PublicKey.findProgramAddress([Buffer.from(INVESTMENT_SEED), new BN(id).toArrayLike(Buffer, 'le', 4)], PROGRAM_ID))[0];
};

export const confirmTx = async (txHash: any, connection: any) => {
  const blockhashInfo = await connection.getLatestBlockhash();
  await connection.confirmTransaction({
    blockhash: blockhashInfo.blockhash,
    lastValidBlockHeight: blockhashInfo.lastValidBlockHeight,
    signature: txHash,
  });
};

export const calculateAPY = ({ duration, total_assets, investment_amount }: { duration: number; total_assets: number; investment_amount: number }) => {
  const apy = 0.06; // Example yield rate of 5%
  const compounding_periods = 12; // Compounded monthly
  const time_in_years = duration; // Example of 2 years

  const future_value = (total_assets += investment_amount * Math.pow(apy, compounding_periods / time_in_years));
  return future_value;
};

export function addAPY(array: any[]) {
  if (array.length > 0) {
    return array.map((obj) => {
      const randomPay = (Math.random() * (0.06 - 0.04) + 0.04).toFixed(4); // 4 decimal places

      return { ...obj, apy: parseFloat(randomPay) }; // Spread existing properties and add 'apy'
    });
  } else {
    return [];
  }
}

export function findMatchingInvestments(array: any[], searchObject: { investmentAmount: string; duration: string; category: string }) {
  const { investmentAmount, duration, category } = searchObject;

  // Convert `investmentAmount` to a numeric value for comparison
  const searchAmount = parseInt(investmentAmount, 16); // Assuming it's in hexadecimal

  return array.filter((item) => {
    // Convert item investmentAmount to a numeric value
    const itemAmount = parseInt(item.account.investmentAmount.toString(), 16);

    // Check for closeness (within 10% range as an example)
    const amountClose = Math.abs(itemAmount - searchAmount) <= searchAmount * 0.1 || Math.abs(itemAmount - searchAmount) >= searchAmount * 0.1;

    // Check duration and category matches
    const durationMatch = item.account.duration > duration || item.account.duration < duration;
    const categoryMatch = category ? item.account.category === category : true;

    return amountClose || durationMatch || categoryMatch;
  });
}

export function wait() {
  return new Promise((resolve) => setTimeout(resolve, 3000));
}

export function findMatches(array1: { account: { investmentId: number } }[], array2: { account: { id: number } }[]) {
  const keysSet = new Set(array1.map((item) => item.account.investmentId));
  return array2.filter((item) => keysSet.has(item.account.id));
}
