import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { kpiCards } from '@/data/mockData';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';

interface MetricsDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MetricsDetailSheet: React.FC<MetricsDetailSheetProps> = ({ open, onOpenChange }) => {
  const statusClasses = {
    compliant: 'border-l-success bg-success/5',
    attention: 'border-l-warning bg-warning/5',
    breach: 'border-l-critical bg-critical/5',
  };

  const descriptions: Record<string, string> = {
    'pending-actions': 'Invoices awaiting your review or action. These require immediate attention to maintain SLA compliance.',
    'sla-compliance': 'Percentage of invoices processed within the defined Service Level Agreement timeframe. Target: 95%.',
    'pending-value': 'Total monetary value of all invoices currently in the approval pipeline.',
    'over-sla-exposure': 'Monetary value at risk due to invoices exceeding SLA deadlines. High priority for resolution.',
    'rework-ratio': 'Percentage of invoices requiring reclassification or resubmission due to errors or issues.',
    'approved-today': 'Number of invoices successfully approved during the current business day.',
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl">All Key Metrics</SheetTitle>
          <SheetDescription>
            Comprehensive view of all KPIs with detailed explanations and trends.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4">
          {kpiCards.map((kpi) => {
            const TrendIcon = kpi.trend === 'up' ? TrendingUp : kpi.trend === 'down' ? TrendingDown : Minus;
            
            return (
              <div 
                key={kpi.id} 
                className={`p-4 rounded-lg border-l-4 ${statusClasses[kpi.status]} border border-border`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">{kpi.label}</p>
                    <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                  </div>
                  {kpi.trend && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded ${
                      kpi.status === 'compliant' ? 'bg-success/10 text-success' : 
                      kpi.status === 'breach' ? 'bg-critical/10 text-critical' : 
                      'bg-warning/10 text-warning'
                    }`}>
                      <TrendIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">{kpi.trendValue}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-start gap-2 mt-3 pt-3 border-t border-border/50">
                  <Info className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    {descriptions[kpi.id] || 'Click to view detailed breakdown.'}
                  </p>
                </div>

                <div className="mt-3 text-xs text-muted-foreground">
                  Visible to: {kpi.visibleTo.join(', ')}
                </div>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};
