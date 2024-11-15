import { UnifiedWalletButton, useWallet } from '@jup-ag/wallet-adapter';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

export default function ConnectButton() {
  const formatAddress = (address: string): string => {
    return `${address.slice(0, 4)}…${address.slice(address.length - 4, address.length)}`;
  };
  const { connected, disconnect, publicKey } = useWallet();

  if (connected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          className="relative inline-flex items-center justify-center p-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal500"
          asChild
        >
          <span>{formatAddress(publicKey?.toBase58() || '')}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute right-0 z-50 w-48 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg outline-none">
          <DropdownMenuLabel className="px-4 py-2 text-gray-700">{formatAddress(publicKey?.toBase58() || '')}</DropdownMenuLabel>
          <DropdownMenuSeparator className="border-t border-gray-300" />
          <DropdownMenuItem className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={disconnect}>
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <UnifiedWalletButton
      currentUserClassName="!focus:outline-none !hover:bg-teal500 !focus:ring-4 !px-5 !py-3 !text-lg font-normal !h-10 !rounded-md"
      buttonClassName="!text-secondary !bg-teal500 hover:bg-teal500/600 focus:ring-4 focus:ring-teal500 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-teal500 dark:hover:bg-teal500 focus:outline-none dark:focus:ring-teal500"
    />
  );
}
