'use client';
import * as anchor from '@project-serum/anchor';
import { DEFAULT_INVESTMENT, INVESTMENT_SEED, PROGRAM_ID, TICKET_SEED, USER_SEED } from '@/libs/constants';
import { IDL as investmentIDL } from '@/libs/idl';
import { LAMPORTS_PER_SOL, SystemProgram } from '@solana/web3.js';
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { useWallet, useConnection, useAnchorWallet } from '@solana/wallet-adapter-react';
import { addAPY, confirmTx, findMatches } from '@/libs/utils';
import { toast } from 'sonner';
import React, { createContext, useEffect, useMemo, useState } from 'react';

export interface INewInvestment {
  investmentAmount: string;
  investmentType: string;
  duration: string;
  category: string;
}

export const AppContext = createContext<any>({});

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const anchorWallet = useAnchorWallet();

  const [openInvestmentDialog, setOpenInvestmentDialog] = useState<boolean>(false);
  const [initialized, setInitialized] = useState(false);
  const [newInvestment, setNewInvestment] = useState<INewInvestment>(DEFAULT_INVESTMENT);
  const [investments, setInvestments] = useState<any>([]);
  const [tickets, setTickets] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const [loadingInvestment, setLoadingInvestment] = useState(false);
  const [loadingBuyInvestment, setLoadingBuyInvestment] = useState(false);
  const [loadingClaimInvestment, setLoadingClaimInvestment] = useState(false);

  const [transactionPending, setTransactionPending] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userHoldings, setUserHoldings] = useState<any[]>([]);

  const program: any = useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions());
      return new anchor.Program(investmentIDL, PROGRAM_ID, provider);
    }
  }, [connection, anchorWallet]);

  const findUserAccount = async () => {
    if (program && publicKey && !transactionPending) {
      try {
        setLoading(true);
        const [profilePda, profileBump] = await findProgramAddressSync([utf8.encode(USER_SEED), publicKey.toBuffer()], program.programId);

        const userAccount: any = await program.account.user.fetch(profilePda);

        if (userAccount) {
          setInitialized(true);
          setUser({
            ...userAccount,
            lastDeposited: userAccount.lastDeposited.toString(),
            totalAssets: userAccount.totalAssets.toString(),
            totalInvestments: userAccount.totalInvestments.toString(),
            totalReturns: userAccount.totalReturns.toString(),
          });

          const investmentsA = await program.account.investment.all();
          const updatedInvestments = addAPY(investmentsA);
          setInvestments(updatedInvestments);

          const userTickets: any = await program.account.ticket.all();
          const currentUserTickets = userTickets.filter((each: any) => each.account.authority.toString() === anchorWallet?.publicKey.toString());
          setTickets(userTickets);

          const userInvestments = findMatches(currentUserTickets, updatedInvestments);
          setUserHoldings(userInvestments);
        } else {
          setInitialized(false);
        }
      } catch (error) {
        setInitialized(false);
        setInvestments([]);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    findUserAccount();
  }, [publicKey, program]);

  const initializeUser = async () => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
        const [userPda, profileBump] = findProgramAddressSync([utf8.encode(USER_SEED), publicKey.toBuffer()], program.programId);

        const tx = await program.methods
          .initUser()
          .accounts({
            user: userPda,
            authority: publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        setInitialized(true);
        toast.success('Successfully initialized user.');
      } catch (error: any) {
        toast.error(error.toString());
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const createInvestment = async () => {
    if (program && publicKey) {
      try {
        setLoadingInvestment(true);
        const [userPda, profileBump] = findProgramAddressSync([utf8.encode(USER_SEED), publicKey.toBuffer()], program.programId);

        const [investmentPda, investmentBump] = findProgramAddressSync(
          [utf8.encode(INVESTMENT_SEED), new anchor.BN(user?.lastId + 1).toArrayLike(Buffer, 'le', 4)],
          program.programId
        );
        const { investmentAmount, investmentType, duration, category } = newInvestment;

        const amount = new anchor.BN(Number(investmentAmount) * LAMPORTS_PER_SOL);

        const txHash = await program.methods
          .createInvestment(amount, investmentType, Number(duration), category)
          .accounts({ user: userPda, investment: investmentPda, authority: publicKey, systemProgram: SystemProgram.programId })
          .rpc();
        await confirmTx(txHash, connection);
        await findUserAccount();
        setOpenInvestmentDialog(false);
        setNewInvestment(DEFAULT_INVESTMENT);
        toast.success('Successfully created an investment');
      } catch (error: any) {
        toast.error(error.toString());
      } finally {
        setLoadingInvestment(false);
      }
    }
  };

  const buyInvestment = async (investment: any, futureValue: number) => {
    if (program && publicKey) {
      try {
        setLoadingBuyInvestment(true);
        const [userPda, profileBump] = findProgramAddressSync([utf8.encode(USER_SEED), publicKey.toBuffer()], program.programId);
        const [ticketPda, ticketBump] = findProgramAddressSync(
          [
            utf8.encode(TICKET_SEED),
            investment.publicKey.toBuffer(),
            new anchor.BN(investments[investments.length - 1].account.lastInvestmentId + 1).toArrayLike(Buffer, 'le', 4),
          ],
          program.programId
        );
        const [investmentPda, investmentBump] = findProgramAddressSync(
          [utf8.encode(INVESTMENT_SEED), new anchor.BN(investment.account.id).toArrayLike(Buffer, 'le', 4)],
          program.programId
        );

        const amount = new anchor.BN(Number(futureValue));

        const txHash = await program.methods
          .buyInvestment(investment.account.id, amount)
          .accounts({ investment: investmentPda, ticket: ticketPda, investmentBuyer: publicKey, user: userPda, systemProgram: SystemProgram.programId })
          .rpc();
        await findUserAccount();

        await confirmTx(txHash, connection);
        toast.success('Successfully purchased investment');
      } catch (error: any) {
        toast.error(error.toString());
      } finally {
        setLoadingBuyInvestment(false);
      }
    }
  };

  const claimInvestmentFunds = async (ticket: any, investment: any) => {
    if (program && publicKey) {
      try {
        setLoadingClaimInvestment(true);
        const [investmentPda, investmentBump] = findProgramAddressSync(
          [utf8.encode(INVESTMENT_SEED), new anchor.BN(investment.account.id).toArrayLike(Buffer, 'le', 4)],
          program.programId
        );
        const [ticketPda, ticketBump] = findProgramAddressSync(
          [utf8.encode(TICKET_SEED), investment.publicKey.toBuffer(), new anchor.BN(ticket.account.id).toArrayLike(Buffer, 'le', 4)],
          program.programId
        );
        const txHash = await program.methods
          .withdrawInvestment(investment.account.id, ticket.account.id)
          .accounts({
            investment: investmentPda,
            ticket: ticketPda,
            authority: publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        await findUserAccount();
        await confirmTx(txHash, connection);
        toast.success('Investment successfully claimed!');
      } catch (error: any) {
        toast.error(error.toString());
      } finally {
        setLoadingClaimInvestment(false);
      }
    }
  };

  const value: any = {
    initializeUser,
    transactionPending,
    createInvestment,
    connected,
    initialized,
    loading,
    user,
    setNewInvestment,
    newInvestment,
    investments,
    setOpenInvestmentDialog,
    openInvestmentDialog,
    buyInvestment,
    tickets,
    claimInvestmentFunds,
    userHoldings,
    loadingInvestment,
    loadingBuyInvestment,
    loadingClaimInvestment,
  };

  return (
    <AppContext.Provider value={value}>
      <div>{children}</div>
    </AppContext.Provider>
  );
}
