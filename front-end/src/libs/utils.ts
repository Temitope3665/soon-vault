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
  const apy = 0.04; // Example yield rate of 5%
  const compounding_periods = 12; // Compounded monthly
  const time_in_years = duration; // Example of 2 years

  const future_value = (total_assets += investment_amount * Math.pow(1 + apy, compounding_periods / time_in_years));
  return future_value;
};

export function addAPY(array: any[]) {
  if (array.length > 0) {
    return array.map((obj) => {
      // Generate a random number between 0.04 and 0.06
      const randomPay = (Math.random() * (0.06 - 0.04) + 0.04).toFixed(4); // 4 decimal places

      // Add the new key-value pair to each object
      return { ...obj, apy: parseFloat(randomPay) }; // Spread existing properties and add 'apy'
    });
  } else {
    return [];
  }
}
