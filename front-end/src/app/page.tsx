'use client';
import { BriefcaseBusiness, ChartCandlestick, Tickets } from 'lucide-react';
import IndividualInvestments from '@/components/investments';
import useInvestments from '@/hooks/useInvestment';
import InvestmentCard from '@/components/investment-card';
import { addAPY } from '@/libs/utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import CreateInvestments from '@/components/create-investments';
import { useState } from 'react';

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const { initialized, user, investments, setOpenInvestmentDialog, openInvestmentDialog } = useInvestments();
  console.log(user, 'user');

  return (
    <div className="space-y-8">
      <div className="w-full grid grid-cols-4 gap-10">
        <div className="bg-grey300 rounded-lg px-4 py-2.5 space-y-4">
          <div className="flex space-x-2 items-center text-[#8F90AC]">
            <BriefcaseBusiness size={16} />
            <p className="text-sm">Your Portfolio Value</p>
          </div>
          <p className="font-semibold">{initialized && user ? Number(user.totalReturns) + Number(user.totalInvestments) : '0'} SOL</p>
        </div>

        <div className="bg-grey300 rounded-lg px-4 py-2.5 space-y-4">
          <div className="flex space-x-2 items-center text-[#8F90AC]">
            <ChartCandlestick size={16} />
            <p className="text-sm text-[#8F90AC]">Total Investment</p>
          </div>
          <p className="font-semibold">{initialized && user ? user.totalInvestments : '0'}</p>
        </div>
        <div className="bg-grey300 rounded-lg px-4 py-2.5 space-y-4">
          <div className="flex space-x-2 items-center text-[#8F90AC]">
            <Tickets size={16} />
            <p className="text-sm text-[#8F90AC]">Aggregated Yield Perfomance</p>
          </div>
          <p className="font-semibold">{initialized && user ? user.totalReturns : '0'} SOL</p>
        </div>
        <div className="bg-grey300 rounded-lg px-4 py-2.5 space-y-4">
          <div className="flex space-x-2 items-center text-[#8F90AC]">
            <Tickets size={16} />
            <p className="text-sm text-[#8F90AC]">Number of Times Deposited</p>
          </div>
          <p className="font-semibold">{initialized && user ? user.numberOfDepositedTimes : '0'} SOL</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p>View new investments</p>

          <Dialog open={openInvestmentDialog} onOpenChange={setOpenInvestmentDialog}>
            <DialogTrigger asChild>
              <Button>Add New Investment</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[50%] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-white">Add New Investment</DialogTitle>
              </DialogHeader>
              <div>
                <CreateInvestments />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="w-full grid grid-cols-2 gap-6">
          {investments.map((each: any) => (
            <InvestmentCard key={each.account.id} each={each} />
          ))}
        </div>
      </div>
    </div>
  );
}
