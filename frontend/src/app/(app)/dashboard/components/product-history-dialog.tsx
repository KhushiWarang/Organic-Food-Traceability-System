'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { MockProduct } from '@/lib/mockData';

interface ProductHistoryDialogProps {
  product: MockProduct;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductHistoryDialog({ product, open, onOpenChange }: ProductHistoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Product History - {product.name} (ID: #{product.id})</DialogTitle>
          <DialogDescription>Complete supply chain journey</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-3">
            {product.history && product.history.length > 0 ? (
              product.history.map((entry, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-wrap break-all">{entry}</p>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No history available</p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
