// import { ReactNode, createContext, useContext, useMemo } from 'react';
// import { BN } from '@project-serum/anchor';
// import { SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
// import { useConnection, useAnchorWallet } from '@solana/wallet-adapter-react';
// import bs58 from 'bs58';

// export const AppContext: any = createContext({});

// export default function AppProvider({ children }: { children: ReactNode }) {
//   const { connection } = useConnection();
//   const anchorWallet = useAnchorWallet();

//   const program = useMemo(() => {
//     if (anchorWallet) {
//       const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions());
//       return new anchor.Program(investmentIDL, PROGRAM_ID, provider);
//     }
//   }, [connection, anchorWallet]);

//   return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
// }

// export const useAppContext = () => {
//   return useContext(AppContext);
// };
