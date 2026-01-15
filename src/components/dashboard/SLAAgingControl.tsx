import React, { useState } from 'react';
import { agingBuckets } from '@/data/mockData';
import { useRole } from '@/contexts/RoleContext';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { InvoiceListSheet } from './InvoiceListSheet';

const formatCurrency = (value: number): string => {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }
  return `₹${(value / 1000).toFixed(0)}K`;
};

export const SLAAgingControl: React.FC = () => {
  const { currentRole } = useRole();
  const [invoiceSheetOpen, setInvoiceSheetOpen] = useState(false);
  const [selectedBucket, setSelectedBucket] = useState<string | null>(null);
  const showValueWeighted = ['director', 'gm'].includes(currentRole);

  // Sort by value for leadership roles
  const sortedBuckets = showValueWeighted
    ? [...agingBuckets].sort((a, b) => b.value - a.value)
    : agingBuckets;

  const tileClasses = {
    green: 'aging-tile-green',
    amber: 'aging-tile-amber',
    red: 'aging-tile-red',
    severe: 'aging-tile-severe',
  };

  const statusColors = {
    green: 'text-success',
    amber: 'text-warning',
    red: 'text-critical',
    severe: 'text-severe',
  };

  const handleBucketClick = (bucketId: string) => {
    setSelectedBucket(bucketId);
    setInvoiceSheetOpen(true);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">SLA & Aging Control</h2>
        <span className="text-xs text-muted-foreground">
          {showValueWeighted ? 'Sorted by Value Exposure' : 'Sorted by Aging'}
        </span>
      </div>

      <div className="dashboard-card p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sortedBuckets.map(bucket => (
            <Tooltip key={bucket.id}>
              <TooltipTrigger asChild>
                <div 
                  className={`aging-tile ${tileClasses[bucket.status]} cursor-pointer`}
                  onClick={() => handleBucketClick(bucket.id)}
                >
                  <span className="text-xs font-medium text-muted-foreground mb-1">{bucket.label}</span>
                  <span className={`kpi-value-large ${statusColors[bucket.status]}`}>{bucket.count}</span>
                  <span className="text-sm font-semibold mt-1">{formatCurrency(bucket.value)}</span>
                  <span className="text-xs text-muted-foreground mt-1">{bucket.range}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{bucket.count} invoices with total value of {formatCurrency(bucket.value)}</p>
                <p className="text-xs text-muted-foreground mt-1">Click to view filtered list</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Summary bar */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <span className="text-muted-foreground">
                Total Pending: <span className="font-semibold text-foreground">{agingBuckets.reduce((sum, b) => sum + b.count, 0)}</span>
              </span>
              <span className="text-muted-foreground">
                Total Value: <span className="font-semibold text-foreground">{formatCurrency(agingBuckets.reduce((sum, b) => sum + b.value, 0))}</span>
              </span>
            </div>
            <button 
              onClick={() => { setSelectedBucket(null); setInvoiceSheetOpen(true); }}
              className="text-primary hover:underline text-sm font-medium"
            >
              View All Invoices →
            </button>
          </div>
        </div>
      </div>

      <InvoiceListSheet 
        open={invoiceSheetOpen} 
        onOpenChange={setInvoiceSheetOpen}
        title={selectedBucket ? `Invoices: ${selectedBucket} Days Aging` : 'All Pending Invoices'}
        filter="aging"
      />
    </div>
  );
};
