import { BriefcaseBusiness, ChartCandlestick, Tickets } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="">
      <div className="w-full grid grid-cols-3 gap-16">
        <div className="bg-grey300 rounded-lg px-4 py-2.5 space-y-4">
          <div className="flex space-x-2 items-center text-[#8F90AC]">
            <BriefcaseBusiness size={16} />
            <p className="text-sm">Your Portfolio Value</p>
          </div>
          <p className="font-semibold">$98,089.00</p>
        </div>

        <div className="bg-grey300 rounded-lg px-4 py-2.5 space-y-4">
          <div className="flex space-x-2 items-center text-[#8F90AC]">
            <ChartCandlestick size={16} />
            <p className="text-sm text-[#8F90AC]">My Assets</p>
          </div>
          <p className="font-semibold">$98,089.00</p>
        </div>
        <div className="bg-grey300 rounded-lg px-4 py-2.5 space-y-4">
          <div className="flex space-x-2 items-center text-[#8F90AC]">
            <Tickets size={16} />
            <p className="text-sm text-[#8F90AC]">Aggregated Yield Perfomance</p>
          </div>
          <p className="font-semibold">$98,089.00</p>
        </div>
      </div>
    </div>
  );
}
