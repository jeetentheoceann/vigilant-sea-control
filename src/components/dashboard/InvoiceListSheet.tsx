import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { highValueInvoices, agingBuckets } from '@/data/mockData';

interface InvoiceListSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  filter?: string;
}

const formatCurrency = (value: number): string => {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }
  return `₹${(value / 1000).toFixed(0)}K`;
};

const getRiskBadge = (risk: string) => {
  const variants: Record<string, string> = {
    critical: 'bg-critical/10 text-critical border-critical/20',
    high: 'bg-warning/10 text-warning border-warning/20',
    medium: 'bg-amber-100 text-amber-700 border-amber-200',
    low: 'bg-success/10 text-success border-success/20',
  };
  return variants[risk] || variants.low;
};

const getStatusBadge = (status: string) => {
  const variants: Record<string, string> = {
    pending: 'bg-warning/10 text-warning border-warning/20',
    disputed: 'bg-critical/10 text-critical border-critical/20',
    approved: 'bg-success/10 text-success border-success/20',
  };
  return variants[status] || variants.pending;
};

export const InvoiceListSheet: React.FC<InvoiceListSheetProps> = ({ 
  open, 
  onOpenChange, 
  title,
  filter 
}) => {
  // Generate more sample invoices based on filter
  const getInvoices = () => {
    if (filter === 'aging') {
      return agingBuckets.flatMap(bucket => 
        Array.from({ length: Math.min(bucket.count, 5) }, (_, i) => ({
          id: `${bucket.id}-${i}`,
          invoiceNo: `INV-2024-${String(1000 + i).padStart(4, '0')}`,
          vendor: ['Gulf Maritime', 'Port Authority', 'Cargo Logistics', 'Marine Equipment', 'Shipping Partners'][i % 5],
          amount: Math.floor(bucket.value / bucket.count),
          aging: parseInt(bucket.id.split('-')[0]) || 15,
          currentApprover: ['M. Hassan (GM)', 'S. Khan (HOD)', 'A. Rahman (HOD)'][i % 3],
          riskFlag: bucket.status === 'severe' ? 'critical' : bucket.status === 'red' ? 'high' : bucket.status === 'amber' ? 'medium' : 'low',
          status: 'pending',
          bucket: bucket.label,
        }))
      );
    }
    return highValueInvoices;
  };

  const invoices = getInvoices();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl">{title}</SheetTitle>
          <SheetDescription>
            {invoices.length} invoices found. Click on any row to view details.
          </SheetDescription>
        </SheetHeader>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Invoice No</TableHead>
                <TableHead className="font-semibold">Vendor</TableHead>
                <TableHead className="font-semibold text-right">Amount</TableHead>
                <TableHead className="font-semibold text-center">Aging</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Risk</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow 
                  key={invoice.id} 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium text-primary">{invoice.invoiceNo}</TableCell>
                  <TableCell>{invoice.vendor}</TableCell>
                  <TableCell className="text-right font-semibold">{formatCurrency(invoice.amount)}</TableCell>
                  <TableCell className="text-center">
                    <span className={invoice.aging > 7 ? 'text-critical font-semibold' : invoice.aging > 3 ? 'text-warning' : ''}>
                      {invoice.aging}d
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusBadge(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getRiskBadge(invoice.riskFlag)}>
                      {invoice.riskFlag}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SheetContent>
    </Sheet>
  );
};
