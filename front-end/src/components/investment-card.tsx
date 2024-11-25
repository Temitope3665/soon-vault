import { calculateAPY, cn } from '@/libs/utils';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from './ui/button';
import { ExternalLink, Plus } from 'lucide-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { SOL_RATE } from '@/libs/constants';

export default function InvestmentCard({ each }: { each: any }) {
  const [open, setOpen] = useState<boolean>(false);
  const totalAssets = Number(each.account.totalAssets.toString()) / LAMPORTS_PER_SOL;
  const totalAssetsInUSD = (Number(each.account.totalAssets.toString()) / LAMPORTS_PER_SOL) * SOL_RATE;
  const investmentAmount = Number(each.account.investmentAmount.toString());
  const investmentReward = calculateAPY({ duration: each.account.duration, total_assets: totalAssets, investment_amount: investmentAmount }) / LAMPORTS_PER_SOL;
  const type = each.account.investmentType;
  return (
    <div className="bg-grey300 p-4 rounded-lg space-y-8 h-fit max-h-[500px]">
      <div className={cn('flex space-x-6 items-center justify-between', open && 'border-b-grey border-b pb-4')}>
        <div className="flex space-x-12 items-center">
          <div className="flex -space-x-2">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <Image src="/solana-sol-logo.png" alt="usdc" width={24} height={24} />
            </div>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <Image src="/solana-sol-logo.png" alt="usdc" width={24} height={24} />
            </div>
          </div>
          <p>SOL.SOL</p>
        </div>

        <Button onClick={() => setOpen((prev) => !prev)}>See details</Button>
      </div>

      {open && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 text-sm gap-12">
            <div className="space-y-4">
              <div className="grid grid-cols-2">
                <p className="text-[#8F90AC]">APY</p>
                <p className="font-bold">{each.apy}%</p>
              </div>
              <div className="grid grid-cols-2">
                <p className="text-[#8F90AC]">Asset</p>
                <p className="">{totalAssets} SOL</p>
              </div>
              <div className="grid grid-cols-2">
                <p className="text-[#8F90AC]">Type</p>
                <p className="">{type}</p>
              </div>
              <div className="grid grid-cols-2">
                <p className="text-[#8F90AC]">Amount</p>
                <p className="">{investmentAmount / LAMPORTS_PER_SOL} SOL</p>
              </div>
              <div className="grid grid-cols-2">
                <p className="text-[#8F90AC]">Staked</p>
                <p className="">{each.account.totalInvestor}</p>
              </div>
            </div>
            <div className="space-y-12">
              <div className="space-y-3">
                <p className="text-[#8F90AC]">Total USD Value</p>
                <p className="font-bold text-xl">${totalAssetsInUSD}</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="text-[#8F90AC]">Assets (USD)</p>
                  <p className="">$ {totalAssets * SOL_RATE}</p>
                </div>
                <div className="space-y-4">
                  <p className="text-[#8F90AC]">Rewards</p>
                  <p className="">{investmentReward.toFixed(2)} SOL</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-4 w-full">
            <Button className="flex" variant="outline">
              <div className="flex space-x-2 items-center">
                <Plus size={20} /> <p>Invest/ Add fund</p>
              </div>
            </Button>
            {/* <Button className="flex">
              <div className="flex space-x-2 items-center">
                <ExternalLink size={20} /> <p>Claim</p>
              </div>
            </Button> */}
          </div>
        </div>
      )}
    </div>
  );
}
