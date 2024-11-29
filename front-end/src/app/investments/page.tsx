'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import CreateInvestments from '@/components/create-investments';
import InvestmentCard from '@/components/investment-card';
import { InvestmentLoading } from '@/components/loading';
import React, { useContext } from 'react';
import EmptyData from '@/components/ui/empty-placeholder';
import { AppContext } from '../providers/appContext';

export default function Investments() {
  const { investments, loading, setOpenInvestmentDialog, openInvestmentDialog, transactionPending, connected, initialized } = useContext(AppContext);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p>View new investments</p>

        <Dialog open={openInvestmentDialog} onOpenChange={setOpenInvestmentDialog}>
          <DialogTrigger asChild>
            <Button disabled={!connected || !initialized}>Add New Investment</Button>
          </DialogTrigger>
          <DialogContent className="lg:max-w-[50%] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Investment</DialogTitle>
            </DialogHeader>
            <div>
              <CreateInvestments />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {transactionPending || loading ? (
        <InvestmentLoading />
      ) : (
        <React.Fragment>
          {investments.length === 0 ? (
            <EmptyData className="mt-24" title="No Invesment Created Yet" description="Unfortunately, there is no investment to purchase for now" />
          ) : (
            <div className="w-full grid-cols-1 grid lg:grid-cols-2 gap-6">
              {investments.map((each: any) => (
                <InvestmentCard key={each.account.id} each={each} />
              ))}
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
}
