'use client';
import { BriefcaseBusiness, ChartCandlestick, Tickets } from 'lucide-react';
import useInvestments from '@/hooks/useInvestment';
import InvestmentCard from '@/components/investment-card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DashboardLoading } from '@/components/loading';
import EmptyData from '@/components/ui/empty-placeholder';
import IndividualInvestments from '@/components/investments';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

export default function Home() {
  const { initialized, user, investments, setOpenInvestmentDialog, openInvestmentDialog, transactionPending, loading } = useInvestments();

  const portfolio = initialized && user ? Number(user.totalReturns) + Number(user.totalInvestments) : 0;

  if (transactionPending || loading) {
    return <DashboardLoading />;
  }

  return (
    <div className="space-y-8">
      <div className="w-full grid grid-cols-4 gap-10">
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

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p>View your investments</p>

          <Dialog open={openInvestmentDialog} onOpenChange={setOpenInvestmentDialog}>
            <DialogTrigger asChild>
              <Button disabled={investments.length === 0}>Generate strategies</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[50%] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-white">Purchase Investment</DialogTitle>
              </DialogHeader>
              <div>
                <IndividualInvestments />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        {investments.length === 0 ? (
          <EmptyData className="mt-24" title="No Invesment Created Yet" description="Unfortunately, there is no investment to purchase for now" />
        ) : (
          <div className="w-full grid grid-cols-2 gap-6">
            {investments.map((each: any) => (
              <InvestmentCard key={each.account.id} each={each} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
