'use client';

import { useState, useEffect } from 'react';
import { useReadContract } from 'wagmi';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { organicFoodTraceabilityAbi } from '@/lib/wagmi-generated';
import { Search } from 'lucide-react';
import { ProductHistoryDialog } from './product-history-dialog';

interface Product {
  id: bigint;
  name: string;
  description: string;
  currentOwner: string;
  currentStage: string;
  timestamp: bigint;
}

export function TrackYourFood() {
  const { contractAddress } = useAppContext();
  const [searchId, setSearchId] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<bigint | null>(null);

  const { data: totalProducts } = useReadContract({
    address: contractAddress,
    abi: organicFoodTraceabilityAbi,
    functionName: 'productCount',
    query: {
      enabled: !!contractAddress,
    },
  });

  const handleSearch = async () => {
    if (!searchId || !contractAddress) return;

    const productId = BigInt(searchId);
    
    try {
      const result = await fetch('/api/getProduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          contractAddress, 
          productId: searchId 
        }),
      });
      const data = await result.json();
      
      if (data.success) {
        setSearchResults([data.product]);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching product:', error);
      setSearchResults([]);
    }
  };

  const handleSearchAll = async () => {
    if (!contractAddress || !totalProducts) return;

    const allProducts: Product[] = [];
    const count = Number(totalProducts);

    for (let i = 1; i <= count; i++) {
      try {
        const result = await fetch('/api/getProduct', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            contractAddress, 
            productId: i.toString() 
          }),
        });
        const data = await result.json();
        
        if (data.success) {
          allProducts.push(data.product);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }

    setSearchResults(allProducts);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Track Your Food</CardTitle>
          <CardDescription>
            Search for products by ID or view all products in the system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2">
            <div className="flex-1 space-y-2">
              <Label htmlFor="search">Product ID</Label>
              <Input
                id="search"
                type="number"
                placeholder="Enter product ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSearch} className="flex-1">
              <Search className="mr-2 h-4 w-4" />
              Search by ID
            </Button>
            <Button onClick={handleSearchAll} variant="outline" className="flex-1">
              View All Products
            </Button>
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Total Products in System: {totalProducts?.toString() || '0'}
            </p>

            {searchResults.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No products found. Use search to find products.
              </p>
            ) : (
              <div className="space-y-4">
                {searchResults.map((product) => (
                  <Card key={product.id.toString()}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                          <CardDescription>{product.description}</CardDescription>
                        </div>
                        <Badge>{product.currentStage}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-sm space-y-1">
                          <p><span className="text-muted-foreground">Product ID:</span> {product.id.toString()}</p>
                          <p><span className="text-muted-foreground">Current Owner:</span></p>
                          <p className="font-mono text-xs break-all">{product.currentOwner}</p>
                          <p><span className="text-muted-foreground">Last Updated:</span> {new Date(Number(product.timestamp) * 1000).toLocaleString()}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedProduct(product.id)}
                          className="w-full"
                        >
                          View Complete History
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedProduct && (
        <ProductHistoryDialog
          productId={selectedProduct}
          open={selectedProduct !== null}
          onOpenChange={(open: boolean) => !open && setSelectedProduct(null)}
        />
      )}
    </>
  );
}
