'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { organicFoodTraceabilityAbi } from '@/lib/wagmi-generated';

export type UserRole = 'Admin' | 'Farmer' | 'Manufacturer' | 'Distributor' | 'Retailer' | 'Consumer' | 'None';

interface AppContextType {
  userRole: UserRole;
  isLoading: boolean;
  refreshRole: () => void;
  contractAddress: `0x${string}` | undefined;
  setContractAddress: (address: `0x${string}`) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Default Hardhat deployer account - always admin
const HARDHAT_DEPLOYER = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();
  const [userRole, setUserRole] = useState<UserRole>('None');
  const [contractAddress, setContractAddress] = useState<`0x${string}` | undefined>(
    typeof window !== 'undefined' 
      ? (localStorage.getItem('organicFoodContractAddress') as `0x${string}`) || undefined
      : undefined
  );

  const { data: role, isLoading, refetch } = useReadContract({
    address: contractAddress,
    abi: organicFoodTraceabilityAbi,
    functionName: 'getUserRole',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isConnected && !!contractAddress,
    },
  });

  useEffect(() => {
    // Hardcode Hardhat deployer account as Admin
    if (address?.toLowerCase() === HARDHAT_DEPLOYER.toLowerCase()) {
      setUserRole('Admin');
    } else if (role) {
      setUserRole(role as UserRole);
    } else if (!isConnected) {
      setUserRole('None');
    }
  }, [role, isConnected, address]);

  useEffect(() => {
    if (contractAddress && typeof window !== 'undefined') {
      localStorage.setItem('organicFoodContractAddress', contractAddress);
    }
  }, [contractAddress]);

  const refreshRole = () => {
    refetch();
  };

  return (
    <AppContext.Provider value={{ userRole, isLoading, refreshRole, contractAddress, setContractAddress }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
