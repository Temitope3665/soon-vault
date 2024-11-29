import { calculateAPY, cn } from '@/libs/utils';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp, ExternalLink, Plus } from 'lucide-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { SOL_RATE } from '@/libs/constants';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AppContext } from '@/app/providers/appContext';

export default function InvestmentCard({ each, hasClaim }: { each: any; hasClaim?: boolean }) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const { buyInvestment, claimInvestmentFunds, tickets, loadingBuyInvestment, loadingClaimInvestment } = useContext(AppContext);

  const totalAssets = Number(each.account.totalAssets.toString()) / LAMPORTS_PER_SOL;
  const totalAssetsInUSD = (Number(each.account.totalAssets.toString()) / LAMPORTS_PER_SOL) * SOL_RATE;
  const investmentAmount = Number(each.account.investmentAmount.toString());
  const investmentReward =
    (calculateAPY({ duration: each.account.duration, total_assets: totalAssets, investment_amount: investmentAmount }) + investmentAmount) / LAMPORTS_PER_SOL;
  const type = each.account.investmentType;

  const handleBuyInvestment = async (each: any, investmentReward: any) => {
    await buyInvestment(each, investmentReward);

    setOpenDialog(false);
  };

  const handleClaim = () => {
    const ticket = tickets.find((ticket: { account: { investmentId: number } }) => ticket.account.investmentId === each.account.id);
    if (ticket) {
      claimInvestmentFunds(ticket, each);
    }
  };

  return (
    <div className={cn('bg-grey300 p-4 rounded-lg space-y-8', open ? 'h-fit min-h-[400px]' : 'h-fit')}>
      <div
        className={cn('flex space-x-6 items-center justify-between cursor-pointer', open && 'border-b-grey border-b pb-4')}
        onClick={() => setOpen((prev) => !prev)}
      >
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

        <div className="cursor-pointer">{open ? <ChevronUp /> : <ChevronDown />}</div>
      </div>

      {open && (
        <div className={cn('space-y-6')}>
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
                <p className="text-[#8F90AC]">Amount</p>
                <p className="">{investmentAmount / LAMPORTS_PER_SOL} SOL</p>
              </div>
              <div className="grid grid-cols-2">
                <p className="text-[#8F90AC]">Staked</p>
                <p className="">{each.account.totalInvestor}</p>
              </div>
              <div className="grid grid-cols-2">
                <p className="text-[#8F90AC]">Duration</p>
                <p className="">{each.account.duration} months</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-4">
                <p className="text-[#8F90AC]">Total USD Value</p>
                <p className="">${totalAssetsInUSD}</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <p className="text-[#8F90AC]">Type</p>
                <p className="">{type}</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="text-[#8F90AC]">Assets (USD)</p>
                  <p className="">$ {totalAssets * SOL_RATE}</p>
                </div>
                <div className="space-y-4">
                  <p className="text-[#8F90AC]">Rewards</p>
                  <p className="">{investmentReward.toFixed(4)} SOL</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-4 w-full">
            {!hasClaim && (
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button className="flex w-full h-12" variant="outline">
                    <div className="flex space-x-2 w-full items-center">
                      <Plus size={20} /> <p>Invest/ Add fund</p>
                    </div>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This investment will be added to your record and a transaction will be made with your wallet
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex">
                    <Button variant="outline" onClick={() => setOpenDialog(false)} className="lg:mt-0 mt-4">
                      Cancel
                    </Button>
                    <Button onClick={() => handleBuyInvestment(each, investmentReward)} pending={loadingBuyInvestment} pendingText="Please wait...">
                      Proceed
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}

            {hasClaim && (
              <Button className="flex w-full" onClick={handleClaim} pending={loadingClaimInvestment} pendingText="Please wait...">
                <div className="flex space-x-2 items-center w-full h-12">
                  <ExternalLink size={20} /> <p>Claim</p>
                </div>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
