'use client';

import React, { ReactNode } from 'react';
import Navbar from '../Navbar';
import Hero from '../hero';
import Image from 'next/image';
import { HOME_URL, INVESTMENTS, PORTFOLIO_URL, REWARD_AND_EARNINGS_URL, TRANSACTIONS_URL } from '@/config/routes';
import { ArrowRightLeft, BriefcaseBusiness, ChartCandlestick, Coins, LayoutDashboard } from 'lucide-react';
import { cn } from '@/libs/utils';
import { usePathname } from 'next/navigation';
import ConnectButton from '../ConnectedButton';

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="p-4 w-full">
      <div className="fixed z-10 w-[20%] bg-secondary h-[96vh] rounded-lg mb-4 p-6">
        <div className="flex items-center text-white space-x-2 my-4 h-12">
          <Image src="/logo.svg" alt="logo" width={40} height={40} />
          <h1 className="text-xl font-light">SoonVault</h1>
        </div>

        <div className="mt-12 px-2 space-y-6">
          {sidebarItems.map((each) => (
            <ul key={each.title}>
              <li>
                <a
                  href={each.href}
                  className={cn(
                    'flex items-center space-x-2.5 text-default trans p-3 text-sm',
                    pathname === each.href ? 'bg-[#6B6A8D] rounded-lg text-white' : 'hover:text-grey200 '
                  )}
                >
                  {each.icon}
                  <p>{each.title}</p>
                </a>
              </li>
            </ul>
          ))}
        </div>
      </div>
      <div className="w-[78%] overflow-x-hidden ml-[22%] text-white px">
        <div className="flex justify-end border-b border-b-[#8F90AC] pb-4">
          <ConnectButton />
        </div>
        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
}

export const sidebarItems = [
  {
    title: 'Home',
    icon: <LayoutDashboard size={20} />,
    href: HOME_URL,
  },
  {
    title: 'Investments',
    icon: <ChartCandlestick size={20} />,
    href: INVESTMENTS,
  },
  {
    title: 'Portfolio',
    icon: <BriefcaseBusiness size={20} />,
    href: PORTFOLIO_URL,
  },
  {
    title: 'Transactions',
    icon: <ArrowRightLeft size={20} />,
    href: TRANSACTIONS_URL,
  },
  {
    title: 'Rewards & Earnings',
    icon: <Coins size={20} />,
    href: REWARD_AND_EARNINGS_URL,
  },
];

{
  /* <Navbar />
<Hero /> */
}
