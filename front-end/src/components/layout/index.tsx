'use client';

import React, { ReactNode, useContext, useState } from 'react';
import Image from 'next/image';
import { HOME_URL, INVESTMENTS, PORTFOLIO_URL, REWARD_AND_EARNINGS_URL, TRANSACTIONS_URL } from '@/config/routes';
import { ArrowRightLeft, BadgeDollarSign, BriefcaseBusiness, ChartCandlestick, Coins, LayoutDashboard, Loader, Menu, X } from 'lucide-react';
import { cn } from '@/libs/utils';
import { usePathname } from 'next/navigation';
import ConnectButton from '../ConnectedButton';
import { Button } from '../ui/button';
import { AppContext } from '@/app/providers/appContext';

export default function Layout({ children }: { children: ReactNode }) {
  const [showNav, setShowNav] = useState(false);
  const pathname = usePathname();
  const { loading, transactionPending, connected, initialized, initializeUser } = useContext(AppContext);

  return (
    <div className="p-4 w-full">
      {showNav && <div className="inset-0 w-full bg-[#000000] opacity-50 h-[100%] ease-in-out duration-300 fixed z-50" onClick={() => setShowNav(false)}></div>}

      <div
        className={cn(
          'fixed z-50 w-[70%] lg:w-[20%] bg-secondary h-[96vh] rounded-lg mb-4 p-6 ease-in-out duration-300',
          showNav ? 'ml-2' : '-translate-x-[105%] lg:translate-x-0'
        )}
      >
        <div className="flex items-center text-white space-x-2 my-4 h-12 justify-between">
          <div className="flex space-x-2 items-center">
            <Image src="/logo.svg" alt="logo" width={40} height={40} />
            <h1 className="text-xl font-light">SoonVault</h1>
          </div>
          <X onClick={() => setShowNav(false)} className="lg:hidden flex" />
        </div>

        <div className="mt-12 px-2 space-y-6">
          {sidebarItems.map((each) => {
            const { title, href, icon, isComingSoon } = each;
            return (
              <ul key={title}>
                <li className="flex space-x-4">
                  <a
                    href={isComingSoon ? '#' : href}
                    className={cn(
                      'flex items-center space-x-2.5 text-default trans p-3 text-sm w-full',
                      pathname === href ? 'bg-[#6B6A8D] rounded-lg text-white' : 'hover:text-grey200',
                      isComingSoon ? 'hover:text-default cursor-not-allowed' : ''
                    )}
                  >
                    {icon}
                    <div className="w-full">
                      <p>{title}</p>
                      {isComingSoon && <p className="text-[10px] text-teal500 font-light">Coming soon!</p>}
                    </div>
                  </a>
                </li>
              </ul>
            );
          })}
        </div>
      </div>

      <div className="lg:w-[78%] overflow-x-hidden lg:ml-[22%] text-white px">
        <div className="flex justify-between border-b border-b-[#8F90AC] pb-4 items-center">
          <div className="flex space-x-2 items-center">
            <Menu className="cursor-pointer lg:hidden flex" onClick={() => setShowNav(true)} />
            <p>{sidebarItems.find((each) => each.href === pathname)?.title}</p>
          </div>
          <div className="h-12">
            {loading ? (
              <Loader className="mr-2 h-6 w-6 mt-2 animate-spin" />
            ) : (
              <div className="flex space-x-2 items-center">
                {!initialized && connected && (
                  <Button variant="outline" onClick={initializeUser} pending={transactionPending} pendingText="Initializing...">
                    Initialize User
                  </Button>
                )}
                <ConnectButton />
              </div>
            )}
          </div>
        </div>
        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
}

export const sidebarItems = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard size={20} />,
    href: HOME_URL,
    isComingSoon: false,
  },
  {
    title: 'Investments',
    icon: <ChartCandlestick size={20} />,
    href: INVESTMENTS,
    isComingSoon: false,
  },
  {
    title: 'Portfolio',
    icon: <BriefcaseBusiness size={20} />,
    href: PORTFOLIO_URL,
    isComingSoon: false,
  },
  {
    title: 'Martket Place',
    icon: <BadgeDollarSign size={20} />,
    href: REWARD_AND_EARNINGS_URL,
    isComingSoon: true,
  },
  {
    title: 'Transactions',
    icon: <ArrowRightLeft size={20} />,
    href: TRANSACTIONS_URL,
    isComingSoon: true,
  },
  {
    title: 'Rewards & Earnings',
    icon: <Coins size={20} />,
    href: REWARD_AND_EARNINGS_URL,
    isComingSoon: true,
  },
];
