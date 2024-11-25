import * as anchor from '@project-serum/anchor';
import { DEFAULT_INVESTMENT, INVESTMENT_SEED, PROGRAM_ID, USER_SEED } from '@/libs/constants';
import { IDL as investmentIDL } from '@/libs/idl';
import { LAMPORTS_PER_SOL, SystemProgram } from '@solana/web3.js';
import { bs58, utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { useWallet, useConnection, useAnchorWallet } from '@solana/wallet-adapter-react';
import { useEffect, useMemo, useState } from 'react';
import { addAPY, authorFilter, confirmTx, getUserAddress } from '@/libs/utils';
import { toast } from 'react-toastify';

interface INewInvestment {
  investmentAmount: string;
  investmentType: string;
  duration: string;
  category: string;
}

export default function useInvestments() {
  const { connection } = useConnection();
  const [userAddress, setUserAddress] = useState<any>();
  const { publicKey, connected, connecting } = useWallet();
  const anchorWallet = useAnchorWallet();

  const [openInvestmentDialog, setOpenInvestmentDialog] = useState<boolean>(false);
  const [initialized, setInitialized] = useState(false);
  const [newInvestment, setNewInvestment] = useState<INewInvestment>(DEFAULT_INVESTMENT);
  const [lastDeposited, setLastDeposited] = useState(0);
  const [investments, setInvestments] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [transactionPending, setTransactionPending] = useState(false);
  const [user, setUser] = useState<any>(null);

  console.log(initialized, '-> user');
  // console.log(user?.totalAssets?.toString(), '-> user');

  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions());
      return new anchor.Program(investmentIDL, PROGRAM_ID, provider);
    }
  }, [connection, anchorWallet]);

  useEffect(() => {
    const findUserAccount = async () => {
      if (program && publicKey && !transactionPending) {
        try {
          setLoading(true);
          const [profilePda, profileBump] = await findProgramAddressSync([utf8.encode(USER_SEED), publicKey.toBuffer()], program.programId);
          const [investmentPda, investmentBump] = findProgramAddressSync(
            [utf8.encode(INVESTMENT_SEED), new anchor.BN(user?.lastId).toArrayLike(Buffer, 'le', 4)],
            program.programId
          );

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
            setInvestments(addAPY(investmentsA));

            // const investments = await program.account.user.all([authorFilter(publicKey.toString())]);
            // console.log(investments, 'ivaA');
          } else {
            console.log('not yet initialized');
            setInitialized(false);
          }
        } catch (error) {
          console.log(error, '-> error');
          setInitialized(false);
          setInvestments([]);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    findUserAccount();
    // updateState();
  }, [publicKey, program, transactionPending]);

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
        console.log(error);
        toast.error(error.toString());
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const createInvestment = async () => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
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
        console.log(txHash, '-> tx');
        setNewInvestment(DEFAULT_INVESTMENT);
        setOpenInvestmentDialog(false);
        toast.success('Successfully created an investment');
      } catch (error: any) {
        console.log(error);
        toast.error(error.toString());
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const buyInvestment = async () => {
    if (program && publicKey) {
      try {
        setTransactionPending(true);
      } catch (error: any) {
        console.log(error);
        toast.error(error.toString());
      } finally {
        setTransactionPending(false);
      }
    }
  };

  return {
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
  };
}
