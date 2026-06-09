'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, CheckCircle } from 'lucide-react';
import { addProductToStorage } from '@/lib/mockData';

export function ProductManagement() {
  const { address } = useAccount();
  const { userRole } = useAppContext();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }

    setIsLoading(true);

    // Simulate blockchain transaction delay
    setTimeout(() => {
      try {
        const stage = userRole === 'Farmer' ? 'Farm' : userRole === 'Manufacturer' ? 'Manufacturing' : 'Farm';
        
        addProductToStorage({
          name,
          description,
          currentOwner: address,
          currentStage: stage,
        });

        toast.success('Product added successfully!', {
          description: `${name} has been added to the supply chain`,
        });
        
        setName('');
        setDescription('');
        
        // Trigger a page refresh to show new product
        window.dispatchEvent(new Event('productAdded'));
      } catch (error) {
        console.error('Error adding product:', error);
        toast.error('Failed to add product');
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Management</CardTitle>
        <CardDescription>Add new organic food products to the supply chain</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddProduct} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              placeholder="e.g., Organic Tomatoes"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter product details, origin, batch number, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Product...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Add Product
              </>
            )}
          </Button>
        </form>

        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-md border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            <strong>Demo Mode:</strong> Products are stored locally for demonstration purposes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
