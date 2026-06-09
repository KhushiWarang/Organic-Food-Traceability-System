'use client';

import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useAccount, useSwitchChain } from 'wagmi';

export function NetworkCheck() {
  const { chain } = useAccount();
  const { switchChain } = useSwitchChain();

  // Hardhat/Localhost chain ID
  const HARDHAT_CHAIN_ID = 31337;

  if (!chain) {
    return null;
  }

  if (chain.id === HARDHAT_CHAIN_ID) {
    return null; // Correct network, no warning needed
  }

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Wrong Network</AlertTitle>
      <AlertDescription className="space-y-2">
        <p>
          You're currently on <strong>{chain.name}</strong> (Chain ID: {chain.id}).
          Please switch to <strong>Hardhat Local</strong> (Chain ID: 31337).
        </p>
        <Button
          onClick={() => switchChain({ chainId: HARDHAT_CHAIN_ID })}
          variant="outline"
          size="sm"
        >
          Switch to Hardhat Local
        </Button>
      </AlertDescription>
    </Alert>
  );
}
