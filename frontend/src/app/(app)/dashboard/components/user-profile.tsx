'use client';

import { useAccount } from 'wagmi';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { getStoredProducts, MockProduct } from '@/lib/mockData';

export function UserProfile() {
  const { address } = useAccount();
  const { userRole, contractAddress } = useAppContext();
  const [products, setProducts] = useState<MockProduct[]>([]);

  useEffect(() => {
    const loadProducts = () => {
      const allProducts = getStoredProducts();
      const userProducts = allProducts.filter(
        p => p.currentOwner.toLowerCase() === address?.toLowerCase()
      );
      setProducts(userProducts);
    };

    loadProducts();

    // Listen for new products
    const handleProductAdded = () => loadProducts();
    window.addEventListener('productAdded', handleProductAdded);
    
    return () => window.removeEventListener('productAdded', handleProductAdded);
  }, [address]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>Your account information and role</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Wallet Address</p>
            <p className="font-mono text-sm">{address}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Role</p>
            <Badge variant={userRole === 'None' ? 'destructive' : 'default'}>
              {userRole}
            </Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Contract Address</p>
            <p className="font-mono text-sm">{contractAddress}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Products</CardTitle>
          <CardDescription>Products currently owned by you</CardDescription>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <p className="text-sm text-muted-foreground">No products owned yet</p>
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
                    <div className="text-sm space-y-1">
                      <p><span className="text-muted-foreground">Product ID:</span> #{product.id}</p>
                      <p><span className="text-muted-foreground">Last Updated:</span> {new Date(product.timestamp).toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
