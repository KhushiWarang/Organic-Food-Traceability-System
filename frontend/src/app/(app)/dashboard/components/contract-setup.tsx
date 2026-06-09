'use client';

import { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

export function ContractSetup() {
  const { setContractAddress } = useAppContext();
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!address) {
      setError('Please enter a contract address');
      return;
    }

    if (!address.match(/^0x[a-fA-F0-9]{40}$/)) {
      setError('Invalid contract address format');
      return;
    }

    setContractAddress(address as `0x${string}`);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Contract Setup</CardTitle>
        <CardDescription>
          Enter the deployed OrganicFoodTraceability contract address to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            If you haven't deployed the contract yet, you need to:
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Start a local Hardhat node: <code className="bg-muted px-1 rounded">npx hardhat node</code></li>
              <li>Deploy the contract: <code className="bg-muted px-1 rounded">npx hardhat ignition deploy ignition/modules/OrganicFoodTraceability.ts --network localhost</code></li>
              <li>Copy the deployed contract address and paste it below</li>
            </ol>
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contractAddress">Contract Address</Label>
            <Input
              id="contractAddress"
              placeholder="0x..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
