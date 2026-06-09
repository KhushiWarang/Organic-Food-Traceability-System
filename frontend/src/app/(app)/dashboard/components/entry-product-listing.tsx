'use client';

import { useAccount } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { ProductHistoryDialog } from './product-history-dialog';
import { getStoredProducts, MockProduct } from '@/lib/mockData';

export function EntryProductListing() {
  const { address } = useAccount();
  const [products, setProducts] = useState<MockProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  useEffect(() => {
    const loadProducts = () => {
      const allProducts = getStoredProducts();
      const userProducts = allProducts.filter(
        p => p.currentOwner.toLowerCase() === address?.toLowerCase()
      );
      setProducts(userProducts);
    };

    loadProducts();

    const handleProductAdded = () => loadProducts();
    window.addEventListener('productAdded', handleProductAdded);
    
    return () => window.removeEventListener('productAdded', handleProductAdded);
  }, [address]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Entry Product Listing</CardTitle>
          <CardDescription>Products that entered your custody</CardDescription>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <p className="text-sm text-muted-foreground">No products in entry list</p>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <Card key={product.id}>
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
                    <div className="flex items-center justify-between">
                      <div className="text-sm space-y-1">
                        <p><span className="text-muted-foreground">Product ID:</span> #{product.id}</p>
                        <p><span className="text-muted-foreground">Received:</span> {new Date(product.timestamp).toLocaleString()}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedProduct(product.id)}
                      >
                        View History
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedProduct && (
        <ProductHistoryDialog
          product={products.find(p => p.id === selectedProduct)!}
          open={selectedProduct !== null}
          onOpenChange={(open: boolean) => !open && setSelectedProduct(null)}
        />
      )}
    </>
  );
}
