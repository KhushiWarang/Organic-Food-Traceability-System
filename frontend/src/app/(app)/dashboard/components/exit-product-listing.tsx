'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Loader2, Send } from 'lucide-react';
import { ProductHistoryDialog } from './product-history-dialog';
import { getStoredProducts, MockProduct, updateProductInStorage } from '@/lib/mockData';

export function ExitProductListing() {
  const { address } = useAccount();
  const [products, setProducts] = useState<MockProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<MockProduct | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transferData, setTransferData] = useState<{
    productId: string;
    to: string;
    location: string;
  }>({
    productId: '',
    to: '',
    location: '',
  });

  useEffect(() => {
    loadProducts();
    
    // Listen for product updates
    const handleProductUpdate = () => loadProducts();
    window.addEventListener('productAdded', handleProductUpdate);
    window.addEventListener('productTransferred', handleProductUpdate);
    
    return () => {
      window.removeEventListener('productAdded', handleProductUpdate);
      window.removeEventListener('productTransferred', handleProductUpdate);
    };
  }, [address]);

  const loadProducts = () => {
    // Get products owned by this user
    const allProducts = getStoredProducts();
    const myProducts = allProducts.filter(
      (p) => p.currentOwner.toLowerCase() === address?.toLowerCase()
    );
    setProducts(myProducts);
  };

  const handleTransfer = async () => {
    if (!transferData.productId || !transferData.to || !transferData.location) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!transferData.to.match(/^0x[a-fA-F0-9]{40}$/)) {
      toast.error('Invalid recipient address');
      return;
    }

    setLoading(true);
    try {
      // Simulate transfer delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Find and update product
      const allProducts = getStoredProducts();
      const product = allProducts.find((p) => p.id === parseInt(transferData.productId));
      
      if (!product) {
        throw new Error('Product not found');
      }
      
      if (product.currentOwner.toLowerCase() !== address?.toLowerCase()) {
        throw new Error('You do not own this product');
      }

      // Update product ownership and history
      const timestamp = new Date().toISOString();
      const updatedHistory = [
        ...product.history,
        `[${timestamp}] Transferred to ${transferData.to.slice(0, 6)}...${transferData.to.slice(-4)} at ${transferData.location} by ${address?.slice(0, 6)}...${address?.slice(-4)}`
      ];
      
      updateProductInStorage(product.id, {
        currentOwner: transferData.to,
        history: updatedHistory
      });
      
      toast.success('Product transferred successfully!');
      setTransferData({ productId: '', to: '', location: '' });
      loadProducts();
      
      // Dispatch event for other components
      window.dispatchEvent(new Event('productTransferred'));
    } catch (error: any) {
      toast.error(error.message || 'Failed to transfer product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Transfer Product</CardTitle>
          <CardDescription>Transfer ownership of a product to the next stage in the supply chain</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="productId">Product ID</Label>
              <Input
                id="productId"
                placeholder="Enter product ID"
                type="number"
                value={transferData.productId}
                onChange={(e) => setTransferData({ ...transferData, productId: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="to">Recipient Address</Label>
              <Input
                id="to"
                placeholder="0x..."
                value={transferData.to}
                onChange={(e) => setTransferData({ ...transferData, to: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter location"
                value={transferData.location}
                onChange={(e) => setTransferData({ ...transferData, location: e.target.value })}
              />
            </div>
            <Button onClick={handleTransfer} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Transferring...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Transfer Product
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Products ({products.length})</CardTitle>
          <CardDescription>Products you can transfer to the next stage</CardDescription>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <p className="text-sm text-muted-foreground">No products available for transfer</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">ID: #{product.id}</p>
                      </div>
                      <Badge>{product.stage || product.currentStage}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      {product.quantity && (
                        <p>
                          <span className="font-medium">Quantity:</span> {product.quantity}
                        </p>
                      )}
                      {product.location && (
                        <p>
                          <span className="font-medium">Location:</span> {product.location}
                        </p>
                      )}
                      <p>
                        <span className="font-medium">Added:</span>{' '}
                        {new Date(product.timestamp).toLocaleDateString()}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => {
                          setSelectedProduct(product);
                          setHistoryOpen(true);
                        }}
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
        <ProductHistoryDialog product={selectedProduct} open={historyOpen} onOpenChange={setHistoryOpen} />
      )}
    </div>
  );
}
