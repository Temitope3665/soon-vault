'use client';

import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { NightlyWalletAdapter, PhantomWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

// eslint-disable-next-line @typescript-eslint/no-require-imports
require('@solana/wallet-adapter-react-ui/styles.css');

export default function AppWalletProvider({ children }: { children: React.ReactNode }) {
  const network = WalletAdapterNetwork.Devnet;
  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const endpoint = useMemo(() => {
    if (network === WalletAdapterNetwork.Devnet) {
      return 'https://api.devnet.solana.com';
    }

    return clusterApiUrl(network);
  }, [network]);

  const wallets = useMemo(
    () => [new NightlyWalletAdapter(), new PhantomWalletAdapter(), new SolflareWalletAdapter({ network }), new TorusWalletAdapter()],
    [network]
  );
  // const wallets = useMemo(
  //   () => [
  //     // manually add any legacy wallet adapters here
  //     // new UnsafeBurnerWalletAdapter(),
  //   ],
  //   []
  // );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
