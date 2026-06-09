'use client';

import { useAccount } from 'wagmi';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserProfile } from './components/user-profile';
import { ProductManagement } from './components/product-management';
import { EntryProductListing } from './components/entry-product-listing';
import { ExitProductListing } from './components/exit-product-listing';
import { TrackYourFood } from './components/track-your-food';
import { RoleManagement } from './components/role-management';
import { ContractSetup } from './components/contract-setup';
import { RoleDebugInfo } from './components/role-debug-info';
import { NetworkCheck } from '@/components/network-check';

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const { userRole, contractAddress } = useAppContext();

  if (!isConnected) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Organic Food Traceability</CardTitle>
            <CardDescription>
              Please connect your MetaMask wallet to access the system.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!contractAddress) {
    return (
      <div className="container mx-auto p-6">
        <ContractSetup />
      </div>
    );
  }

  const canManageProducts = userRole === 'Farmer' || userRole === 'Manufacturer' || userRole === 'Admin';
  const canUseProducts = userRole === 'Retailer' || userRole === 'Consumer' || userRole === 'Admin';
  const isAdmin = userRole === 'Admin';

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Organic Food Traceability System</h1>
          <p className="text-muted-foreground mt-2">
            Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        </div>
        <Badge variant={userRole === 'None' ? 'destructive' : 'default'} className="text-lg px-4 py-2">
          {userRole}
        </Badge>
      </div>

      <NetworkCheck />
      <RoleDebugInfo />

      {userRole === 'None' && (
        <Card className="bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
          <CardHeader>
            <CardTitle>No Role Assigned</CardTitle>
            <CardDescription>
              Please contact the administrator to assign you a role in the system.
              If you deployed the contract, you should automatically be the Admin.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-7 lg:w-auto">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          {canManageProducts && <TabsTrigger value="products">Products</TabsTrigger>}
          <TabsTrigger value="entry">Entry List</TabsTrigger>
          <TabsTrigger value="exit">Exit List</TabsTrigger>
          {canUseProducts && <TabsTrigger value="used">Used Today</TabsTrigger>}
          <TabsTrigger value="track">Track Food</TabsTrigger>
          {isAdmin && <TabsTrigger value="admin">Admin</TabsTrigger>}
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <UserProfile />
        </TabsContent>

        {canManageProducts && (
          <TabsContent value="products" className="mt-6">
            <ProductManagement />
          </TabsContent>
        )}

        <TabsContent value="entry" className="mt-6">
          <EntryProductListing />
        </TabsContent>

        <TabsContent value="exit" className="mt-6">
          <ExitProductListing />
        </TabsContent>

        <TabsContent value="track" className="mt-6">
          <TrackYourFood />
        </TabsContent>

        {isAdmin && (
          <TabsContent value="admin" className="mt-6">
            <RoleManagement />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
