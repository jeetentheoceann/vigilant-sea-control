import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useRole } from '@/contexts/RoleContext';
import { kpiCards } from '@/data/mockData';
import { KPICard } from '@/types/dashboard';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { MetricsDetailSheet } from './MetricsDetailSheet';

const KPICardComponent: React.FC<{ kpi: KPICard }> = ({ kpi }) => {
  const statusClasses = {
    compliant: 'border-l-success',
    attention: 'border-l-warning',
    breach: 'border-l-critical',
  };

  const trendColors = {
    up: kpi.status === 'compliant' ? 'text-success' : 'text-critical',
    down: kpi.status === 'compliant' ? 'text-success' : 'text-critical',
    stable: 'text-muted-foreground',
  };

  const TrendIcon = kpi.trend === 'up' ? TrendingUp : kpi.trend === 'down' ? TrendingDown : Minus;

  const tooltipContent = {
    'pending-actions': 'Total invoices awaiting your action. Click to view queue.',
    'sla-compliance': 'Percentage of invoices processed within SLA. Target: 95%',
    'pending-value': 'Total monetary value of invoices pending approval.',
    'over-sla-exposure': 'Monetary value at risk due to SLA breaches. Requires immediate attention.',
    'rework-ratio': 'Percentage of invoices requiring reclassification or resubmission.',
    'approved-today': 'Number of invoices approved in current business day.',
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={`dashboard-card kpi-clickable border-l-4 ${statusClasses[kpi.status]} p-4 min-w-[160px] flex-1`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="kpi-label mb-1">{kpi.label}</p>
              <p className="kpi-value">{kpi.value}</p>
            </div>
            {kpi.trend && (
              <div className={`flex items-center gap-1 ${trendColors[kpi.trend]}`}>
                <TrendIcon className="w-4 h-4" />
                <span className="text-xs font-medium">{kpi.trendValue}</span>
              </div>
            )}
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-xs">
        <p>{tooltipContent[kpi.id as keyof typeof tooltipContent] || 'Click to view details'}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export const KPIStrip: React.FC = () => {
  const { currentRole } = useRole();
  const [metricsOpen, setMetricsOpen] = useState(false);

  // Filter KPIs based on current role
  const visibleKPIs = kpiCards.filter(kpi => kpi.visibleTo.includes(currentRole));

  // For director/GM, prioritize value-based KPIs
  const sortedKPIs = ['director', 'gm'].includes(currentRole)
    ? [...visibleKPIs].sort((a, b) => {
        const valueKPIs = ['pending-value', 'over-sla-exposure', 'sla-compliance'];
        const aIndex = valueKPIs.indexOf(a.id);
        const bIndex = valueKPIs.indexOf(b.id);
        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
        return 0;
      })
    : visibleKPIs;

  // Limit to 6 KPIs max
  const displayKPIs = sortedKPIs.slice(0, 6);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Key Metrics</h2>
        <button 
          onClick={() => setMetricsOpen(true)}
          className="text-sm text-primary hover:underline font-medium"
        >
          View All Metrics →
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {displayKPIs.map(kpi => (
          <KPICardComponent key={kpi.id} kpi={kpi} />
        ))}
      </div>
      
      <MetricsDetailSheet open={metricsOpen} onOpenChange={setMetricsOpen} />
    </div>
  );
};
