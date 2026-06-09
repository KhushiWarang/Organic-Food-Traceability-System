"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { organicFoodTraceabilityAbi } from "@/lib/wagmi-generated";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDeployContract, useWaitForTransactionReceipt, usePublicClient } from "wagmi";
import { useAppContext } from "@/contexts/AppContext";

export function DeployContract() {
  const { isPending, data: hash, deployContract } = useDeployContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });
  const { setContractAddress } = useAppContext();
  const publicClient = usePublicClient();
  const [bytecode, setBytecode] = useState<`0x${string}` | null>(null);

  useEffect(() => {
    fetch('/api/getContractBytecode')
      .then(res => res.json())
      .then(data => {
        if (data.bytecode) {
          setBytecode(data.bytecode);
        }
      })
      .catch(err => console.error('Error fetching bytecode:', err));
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!bytecode) {
      toast.error("Contract bytecode not loaded");
      return;
    }

    try {
      deployContract({
        abi: organicFoodTraceabilityAbi,
        bytecode: bytecode,
      });
    } catch (error) {
      console.error('Error deploying contract:', error);
      toast.error("Failed to deploy contract");
    }
  }

  useEffect(() => {
    if (!hash) return;
    toast.success("Contract deployment initiated", { description: hash });
  }, [hash]);

  useEffect(() => {
    const getContractAddress = async () => {
      if (isSuccess && hash && publicClient) {
        try {
          const receipt = await publicClient.getTransactionReceipt({ hash });
          if (receipt.contractAddress) {
            setContractAddress(receipt.contractAddress);
            toast.success("Contract deployed successfully!", { 
              description: `Address: ${receipt.contractAddress}` 
            });
          }
        } catch (error) {
          console.error('Error getting contract address:', error);
        }
      }
    };

    getContractAddress();
  }, [isSuccess, hash, publicClient, setContractAddress]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deploy New Contract</CardTitle>
        <CardDescription>
          Deploy the Organic Food Traceability contract
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This will deploy a new instance of the OrganicFoodTraceability smart contract. 
          You will become the admin and can manage roles.
        </p>
      </CardContent>
      <CardFooter>
        <form onSubmit={submit} className="w-full">
          <Button 
            className="w-full" 
            disabled={isPending || isConfirming || !bytecode} 
            type="submit"
          >
            {isPending || isConfirming ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                {isPending ? 'Confirming...' : 'Deploying...'}
              </>
            ) : (
              "Deploy Contract"
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
