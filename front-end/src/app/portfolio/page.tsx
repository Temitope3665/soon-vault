'use client';
import InvestmentCard from '@/components/investment-card';
import { DashboardLoading } from '@/components/loading';
import EmptyData from '@/components/ui/empty-placeholder';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { BriefcaseBusiness, ChartCandlestick, Tickets } from 'lucide-react';
import React, { useContext } from 'react';
import { AppContext } from '../providers/appContext';

export default function Portfolio() {
  const { initialized, user, userHoldings, transactionPending, loading } = useContext(AppContext);

  const portfolio = initialized && user ? Number(user.totalReturns) + Number(user.totalInvestments) : 0;

  if (transactionPending || loading) {
    return <DashboardLoading />;
  }
  return (
    <div className="space-y-8">
      <div className="w-full grid-cols-1 grid lg:grid-cols-4 gap-10">
        <div className="bg-grey300 rounded-lg px-4 py-2.5 space-y-4">
          <div className="flex space-x-2 items-center text-[#8F90AC]">
            <BriefcaseBusiness size={16} />
            <p className="text-sm">Your Portfolio Value</p>
          </div>
          <p className="font-semibold">{(portfolio / LAMPORTS_PER_SOL).toFixed(3)} SOL</p>
        </div>

        <div className="bg-grey300 rounded-lg px-4 py-2.5 space-y-4">
          <div className="flex space-x-2 items-center text-[#8F90AC]">
            <ChartCandlestick size={16} />
            <p className="text-sm text-[#8F90AC]">Total Investment</p>
          </div>
          <p className="font-semibold">{initialized && user ? (Number(user.totalInvestments) / LAMPORTS_PER_SOL).toFixed(3) : '0'} SOL</p>
        </div>
        <div className="bg-grey300 rounded-lg px-4 py-2.5 space-y-4">
          <div className="flex space-x-2 items-center text-[#8F90AC]">
            <Tickets size={16} />
            <p className="text-sm text-[#8F90AC]">Aggregated Yield Perfomance</p>
          </div>
          <p className="font-semibold">
            {initialized && user ? (Number(user.totalReturns) + Number(user.totalInvestments) / LAMPORTS_PER_SOL).toFixed(3) : '0'} SOL
          </p>
        </div>
        <div className="bg-grey300 rounded-lg px-4 py-2.5 space-y-4">
          <div className="flex space-x-2 items-center text-[#8F90AC]">
            <Tickets size={16} />
            <p className="text-sm text-[#8F90AC]">Number of Times Deposited</p>
          </div>
          <p className="font-semibold">{initialized && user ? user.numberOfDepositedTimes : '0'}</p>
        </div>
      </div>

      <div className="w-[100%] space-y-4">
        <h1 className="font-bold text-xl">Your Holdings</h1>

        <React.Fragment>
          {userHoldings.length === 0 ? (
            <EmptyData
              className="mt-24"
              title="You have no holdings currently"
              description="Unfortunately, you have no holdings to your wallet at the moment"
            />
          ) : (
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
              {userHoldings.map((each: any) => (
                <InvestmentCard key={each.account.id} each={each} hasClaim />
              ))}
            </div>
          )}
        </React.Fragment>
      </div>
    </div>
  );
}
