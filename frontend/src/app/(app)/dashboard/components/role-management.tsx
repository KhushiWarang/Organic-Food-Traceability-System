'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { organicFoodTraceabilityAbi } from '@/lib/wagmi-generated';
import { toast } from 'sonner';
import { Loader2, UserPlus, UserMinus } from 'lucide-react';
import { keccak256, toBytes } from 'viem';

const ROLES = [
  { value: 'FARMER_ROLE', label: 'Farmer' },
  { value: 'MANUFACTURER_ROLE', label: 'Manufacturer' },
  { value: 'DISTRIBUTOR_ROLE', label: 'Distributor' },
  { value: 'RETAILER_ROLE', label: 'Retailer' },
  { value: 'CONSUMER_ROLE', label: 'Consumer' },
];

export function RoleManagement() {
  const { contractAddress, refreshRole } = useAppContext();
  const [grantAddress, setGrantAddress] = useState('');
  const [revokeAddress, setRevokeAddress] = useState('');
  const [selectedGrantRole, setSelectedGrantRole] = useState('');
  const [selectedRevokeRole, setSelectedRevokeRole] = useState('');

  const { writeContract: grantRole, data: grantHash, isPending: isGrantPending } = useWriteContract();
  const { writeContract: revokeRole, data: revokeHash, isPending: isRevokePending } = useWriteContract();
  const { isLoading: isGrantConfirming } = useWaitForTransactionReceipt({ hash: grantHash });
  const { isLoading: isRevokeConfirming } = useWaitForTransactionReceipt({ hash: revokeHash });

  const getRoleHash = (roleName: string): `0x${string}` => {
    return keccak256(toBytes(roleName));
  };

  const handleGrantRole = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contractAddress || !selectedGrantRole) {
      toast.error('Please select a role');
      return;
    }

    if (!grantAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      toast.error('Invalid address');
      return;
    }

    try {
      const roleHash = getRoleHash(selectedGrantRole);
      
      grantRole({
        address: contractAddress,
        abi: organicFoodTraceabilityAbi,
        functionName: 'grantUserRole',
        args: [grantAddress as `0x${string}`, roleHash],
      });

      toast.success('Role granted successfully!');
      setGrantAddress('');
      setSelectedGrantRole('');
      setTimeout(() => refreshRole(), 2000);
    } catch (error) {
      console.error('Error granting role:', error);
      toast.error('Failed to grant role');
    }
  };

  const handleRevokeRole = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contractAddress || !selectedRevokeRole) {
      toast.error('Please select a role');
      return;
    }

    if (!revokeAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      toast.error('Invalid address');
      return;
    }

    try {
      const roleHash = getRoleHash(selectedRevokeRole);
      
      revokeRole({
        address: contractAddress,
        abi: organicFoodTraceabilityAbi,
        functionName: 'revokeUserRole',
        args: [revokeAddress as `0x${string}`, roleHash],
      });

      toast.success('Role revoked successfully!');
      setRevokeAddress('');
      setSelectedRevokeRole('');
      setTimeout(() => refreshRole(), 2000);
    } catch (error) {
      console.error('Error revoking role:', error);
      toast.error('Failed to revoke role');
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Grant Role
          </CardTitle>
          <CardDescription>Assign a role to a user address</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGrantRole} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="grantAddress">User Address</Label>
              <Input
                id="grantAddress"
                placeholder="0x..."
                value={grantAddress}
                onChange={(e) => setGrantAddress(e.target.value)}
                disabled={isGrantPending || isGrantConfirming}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="grantRole">Role</Label>
              <Select
                value={selectedGrantRole}
                onValueChange={setSelectedGrantRole}
                disabled={isGrantPending || isGrantConfirming}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={isGrantPending || isGrantConfirming}
              className="w-full"
            >
              {isGrantPending || isGrantConfirming ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Granting Role...
                </>
              ) : (
                'Grant Role'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserMinus className="h-5 w-5" />
            Revoke Role
          </CardTitle>
          <CardDescription>Remove a role from a user address</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRevokeRole} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="revokeAddress">User Address</Label>
              <Input
                id="revokeAddress"
                placeholder="0x..."
                value={revokeAddress}
                onChange={(e) => setRevokeAddress(e.target.value)}
                disabled={isRevokePending || isRevokeConfirming}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="revokeRole">Role</Label>
              <Select
                value={selectedRevokeRole}
                onValueChange={setSelectedRevokeRole}
                disabled={isRevokePending || isRevokeConfirming}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={isRevokePending || isRevokeConfirming}
              className="w-full"
              variant="destructive"
            >
              {isRevokePending || isRevokeConfirming ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Revoking Role...
                </>
              ) : (
                'Revoke Role'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
