'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DEFAULT_INVESTMENT, categories, riskLevel } from '@/libs/constants';
import React, { useContext, useState } from 'react';
import { cn, findMatchingInvestments, wait } from '@/libs/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import InvestmentCard from './investment-card';
import { AppContext, INewInvestment } from '@/app/providers/appContext';

export default function IndividualInvestments() {
  const [newInvestment, setNewInvestment] = useState<INewInvestment>(DEFAULT_INVESTMENT);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const { initialized, investments } = useContext(AppContext);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedInvestment, setGeneratedInvestment] = useState<any>(null);

  const handleSelectCategory = (value: string) => {
    if (initialized) {
      setSelectedCategory(value);
      setNewInvestment((prev) => ({ ...prev, investmentType: value }));
    }
  };

  const handleGenerateInvestment = () => {
    setIsGenerating(true);
    wait().then(() => {
      const { investmentType, ...others } = newInvestment;
      const response = findMatchingInvestments(investments, others);
      setGeneratedInvestment(response[0]);
      setIsGenerating(false);
    });
  };

  return (
    <React.Fragment>
      {generatedInvestment ? (
        <div className="w-full grid grid-cols-1 gap-6">
          {[generatedInvestment].map((each: any) => (
            <div key={each.account.id} className="space-y-2">
              <p className="text-xs font-light text-teal500 cursor-pointer" onClick={() => setGeneratedInvestment(null)}>
                Generate a new investment ?
              </p>
              <InvestmentCard each={each} />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-[#8F90AC]">Determine today's prices by market cap</p>
          <div className="bg-grey300 rounded-lg px-4 py-8 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-medium text-white">Select categories</h1>
                <Select
                  disabled={!initialized}
                  defaultValue={newInvestment.category}
                  onValueChange={(value) => setNewInvestment((prev) => ({ ...prev, investmentType: value }))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Yield Farming Agent">Yield Farming Agent</SelectItem>
                      <SelectItem value="Token Agent">Token Agent</SelectItem>
                      <SelectItem value="Lending & Borrowing Agent">Lending & Borrowing Agent</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {categories.map((each: string) => (
                  <p
                    key={each}
                    className={cn(
                      'bg-secondary rounded-lg px-4 py-2.5 space-y-4 trans border border-secondary text-center',
                      each === selectedCategory ? 'bg-teal500 border-teal500 text-white' : 'hover:border-[#8F90AC]',
                      initialized ? 'cursor-pointer' : 'cursor-not-allowed hover:border-none'
                    )}
                    onClick={() => handleSelectCategory(each)}
                  >
                    {each}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-2xl font-medium text-white">Select Risk Level</h1>
              <div className="grid grid-cols-5 gap-10">
                {riskLevel.map((each, index) => (
                  <p
                    key={each}
                    className={cn(
                      'bg-secondary rounded-lg px-4 py-2.5 space-y-4 trans border border-secondary text-center',
                      each === selectedLevel ? 'bg-teal500 border-teal500 text-white' : 'hover:border-[#8F90AC]',
                      initialized ? 'cursor-pointer' : 'cursor-not-allowed hover:border-none'
                    )}
                    onClick={() => setSelectedLevel(each)}
                  >
                    {each}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="w-full space-y-4">
                <h1 className="text-2xl font-medium text-white">Initial Capital</h1>
                <div className="flex space-x-8 w-full">
                  <div className="relative w-1/2 space-y-2">
                    <p className="text-sm text-grey200">Amount</p>
                    <Input
                      placeholder="Amount"
                      type="number"
                      className="h-12"
                      disabled={!initialized}
                      value={newInvestment.investmentAmount}
                      onChange={({ target }) => setNewInvestment((prev) => ({ ...prev, investmentAmount: target.value }))}
                    />
                    <p className="text-sm font-light absolute top-[45%] right-10 text-grey200">SOON</p>
                  </div>

                  <div className="relative w-full space-y-2">
                    <p className="text-sm text-grey200">Duration</p>
                    <Select
                      disabled={!initialized}
                      defaultValue={newInvestment.duration}
                      onValueChange={(value) => setNewInvestment((prev) => ({ ...prev, duration: value }))}
                    >
                      <SelectTrigger className="w-[180px] h-12">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="6">Less than 6 months</SelectItem>
                          <SelectItem value="12">6 - 12 months</SelectItem>
                          <SelectItem value="24">12 - 24 months</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  className="w-[100%] h-12"
                  disabled={
                    (!initialized && !newInvestment.category) || !newInvestment.duration || !newInvestment.investmentAmount || !newInvestment.investmentType
                  }
                  pending={isGenerating}
                  pendingText="Generating..."
                  onClick={handleGenerateInvestment}
                >
                  Generate Strategies
                </Button>
                <p className="text-xs text-grey200">Note: It might take up to few mins to generate a strategy</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
