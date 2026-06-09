import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { localhost } from 'viem/chains';
import { organicFoodTraceabilityAbi } from '@/lib/wagmi-generated';

export async function POST(request: NextRequest) {
  try {
    const { contractAddress, productId } = await request.json();

    if (!contractAddress || !productId) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const publicClient = createPublicClient({
      chain: localhost,
      transport: http(),
    });

    const product = await publicClient.readContract({
      address: contractAddress as `0x${string}`,
      abi: organicFoodTraceabilityAbi,
      functionName: 'getProduct',
      args: [BigInt(productId)],
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product: {
        id: product[0],
        name: product[1],
        description: product[2],
        currentOwner: product[3],
        currentStage: product[4],
        timestamp: product[5],
      },
    });
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
