'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/libs/utils';
import { ExternalLink, Plus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function Portfolio() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="space-y-8">
      <div className="bg-grey300 p-4 rounded-lg grid grid-cols-4">
        <div className="space-y-2 b">
          <p className="text-sm font-light text-[#8F90AC]">CURRENT BALANCE</p>
          <p className="font-bold">$20,000</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-light text-[#8F90AC]">ALL TIME PROFIT</p>
          <p className="font-bold">2.5%</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-light text-[#8F90AC]">BEST PERFORMER</p>
          <p className="font-bold">12.5%</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-light text-[#8F90AC]">WORST PERFORMER</p>
          <p className="text-red-600 font-bold">12.5%</p>
        </div>
      </div>

      <div className="w-[100%] space-y-4">
        <h1 className="font-bold text-xl">Your Holdings</h1>

        {/* <div className="flex space-x-4"> */}
        <div className="bg-grey300 p-4 rounded-lg space-y-8">
          <div className={cn('flex space-x-6 items-center justify-between', open && 'border-b-grey border-b pb-4')}>
            <div className="flex space-x-12">
              <div className="flex">
                <Image src="/eth.png" alt="eth" width={24} height={24} className="" />
                <Image src="/usdc.png" alt="usdc" width={24} height={24} className="-ml-2" />
              </div>
              <p>ETH.USDC</p>
            </div>

            <Button onClick={() => setOpen((prev) => !prev)}>See details</Button>
          </div>

          {open && (
            <div className="space-y-12">
              <div className="grid grid-cols-2 text-sm gap-12">
                <div className="space-y-4">
                  <div className="grid grid-cols-2">
                    <p className="text-[#8F90AC]">APY</p>
                    <p className="font-bold">32.04%</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p className="text-[#8F90AC]">Asset</p>
                    <p className="">fUNIV3_USDC_ETH</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p className="text-[#8F90AC]">Pool</p>
                    <p className="">Sushiswap</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p className="text-[#8F90AC]">Balance</p>
                    <p className="">0.00</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p className="text-[#8F90AC]">Staked</p>
                    <p className="">12.4524</p>
                  </div>
                </div>
                <div className="space-y-12">
                  <div className="space-y-3">
                    <p className="text-[#8F90AC]">Total USD Value</p>
                    <p className="font-bold text-xl">$20,005.00</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <p className="text-[#8F90AC]">Assets</p>
                      <p className="">$2,005.53</p>
                    </div>
                    <div className="space-y-4">
                      <p className="text-[#8F90AC]">Rewards</p>
                      <p className="">$0.03</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4">
                <Button className="flex" variant="outline">
                  <Plus size={20} /> <p>Add fund</p>
                </Button>
                <Button className="flex">
                  <ExternalLink size={20} /> <p>Claim</p>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* <div className="border border-grey300 p-3 rounded-lg">
            <p className="text-sm font-light text-[#8F90AC]">REWARDS</p>
          </div> */}
      </div>
      {/* </div> */}
    </div>
  );
}
