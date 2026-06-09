'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { organicFoodTraceabilityAbi } from '@/lib/wagmi-generated';
import { InfoIcon, RefreshCw, AlertCircle } from 'lucide-react';
import { zeroHash } from 'viem';

export function RoleDebugInfo() {
  const { address, isConnected, chain } = useAccount();
  const { contractAddress, userRole, refreshRole } = useAppContext();

  // DEFAULT_ADMIN_ROLE is 0x0000...0000
  const { data: adminRole, error: adminError, isLoading: adminLoading } = useReadContract({
    address: contractAddress,
    abi: organicFoodTraceabilityAbi,
    functionName: 'hasRole',
    args: address && contractAddress ? [zeroHash, address] : undefined,
    query: {
      enabled: !!address && !!contractAddress,
    },
  });

  const { data: fetchedRole, error: roleError, isLoading: roleLoading } = useReadContract({
    address: contractAddress,
    abi: organicFoodTraceabilityAbi,
    functionName: 'getUserRole',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!contractAddress,
    },
  });

  if (!isConnected || !contractAddress) {
    return null;
  }

  const hasError = adminError || roleError;
  const isLoading = adminLoading || roleLoading;

  return (
    <Alert variant={hasError ? "destructive" : "default"}>
      {hasError ? <AlertCircle className="h-4 w-4" /> : <InfoIcon className="h-4 w-4" />}
      <AlertTitle>Role Information {isLoading && "(Loading...)"}</AlertTitle>
      <AlertDescription className="space-y-2">
        <div className="text-sm space-y-1">
          <p><strong>Your Address:</strong> {address}</p>
          <p><strong>Contract Address:</strong> {contractAddress}</p>
          <p><strong>Network:</strong> {chain?.name || 'Unknown'} (ID: {chain?.id})</p>
          <p><strong>Detected Role:</strong> {userRole}</p>
          <p><strong>Contract Says:</strong> {
            roleError ? `Error: ${roleError.message}` :
            isLoading ? 'Loading...' :
            fetchedRole as string || 'None'
          }</p>
          <p><strong>Is Admin:</strong> {
            adminError ? `Error: ${adminError.message}` :
            adminLoading ? 'Loading...' :
            adminRole ? 'Yes' : 'No'
          }</p>
        </div>
        {hasError && (
          <div className="mt-2 p-2 bg-destructive/10 rounded text-xs">
            <p className="font-semibold">Troubleshooting:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Make sure Hardhat node is running: <code>npx hardhat node</code></li>
              <li>Verify you're on the correct network (Chain ID: 31337)</li>
              <li>Check that the contract address is correct</li>
              <li>Try refreshing the page</li>
            </ul>
          </div>
        )}
        <Button onClick={refreshRole} size="sm" variant="outline" disabled={isLoading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Role
        </Button>
      </AlertDescription>
    </Alert>
  );
}
