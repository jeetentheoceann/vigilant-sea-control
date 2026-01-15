import React from 'react';
import { riskSummary, highValueInvoices } from '@/data/mockData';
import { AlertTriangle, DollarSign, Clock, FileWarning, Scale } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const formatCurrency = (value: number): string => {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }
  return `₹${(value / 1000).toFixed(0)}K`;
};

const RiskCard: React.FC<{ icon: React.ReactNode; label: string; value: number; variant?: 'default' | 'warning' | 'critical' }> = ({
  icon,
  label,
  value,
  variant = 'default',
}) => {
  const variantClasses = {
    default: 'border-border',
    warning: 'border-warning/30 bg-warning-muted',
    critical: 'border-critical/30 bg-critical-muted',
  };

  return (
    <div className={`dashboard-card p-4 border ${variantClasses[variant]}`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-md flex items-center justify-center ${
          variant === 'critical' ? 'bg-critical/20 text-critical' :
          variant === 'warning' ? 'bg-warning/20 text-warning' :
          'bg-primary/10 text-primary'
        }`}>
          {icon}
        </div>
        <div>
          <p className="kpi-label">{label}</p>
          <p className="kpi-value">{formatCurrency(value)}</p>
        </div>
      </div>
    </div>
  );
};

const RiskFlagBadge: React.FC<{ flag: 'low' | 'medium' | 'high' | 'critical' }> = ({ flag }) => {
  const config = {
    low: { className: 'bg-success-muted text-success border-success/30', label: 'Low' },
    medium: { className: 'bg-muted text-muted-foreground border-border', label: 'Medium' },
    high: { className: 'bg-warning-muted text-warning border-warning/30', label: 'High' },
    critical: { className: 'bg-critical-muted text-critical border-critical/30 animate-pulse-slow', label: 'Critical' },
  };

  return (
    <Badge variant="outline" className={config[flag].className}>
      {config[flag].label}
    </Badge>
  );
};

export const FinancialRisk: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Financial Risk & Exposure</h2>
        <button className="text-sm text-primary hover:underline font-medium">
          View All Risks →
        </button>
      </div>

      {/* Risk Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <RiskCard
          icon={<DollarSign className="w-5 h-5" />}
          label="Total Exposure"
          value={riskSummary.totalExposure}
        />
        <RiskCard
          icon={<Clock className="w-5 h-5" />}
          label="Under Approval"
          value={riskSummary.underApproval}
          variant="warning"
        />
        <RiskCard
          icon={<FileWarning className="w-5 h-5" />}
          label="Approved but Unpaid"
          value={riskSummary.approvedUnpaid}
        />
        <RiskCard
          icon={<Scale className="w-5 h-5" />}
          label="Under Dispute"
          value={riskSummary.underDispute}
          variant="critical"
        />
      </div>

      {/* High-Value Watchlist Table */}
      <div className="dashboard-card">
        <div className="dashboard-card-header flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <h3 className="text-sm font-semibold">High-Value Watchlist</h3>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">Top 5 by exposure</span>
            <button className="text-sm text-primary hover:underline font-medium">
              View All Invoices →
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Invoice No</th>
                <th>Vendor</th>
                <th>Amount</th>
                <th>Aging</th>
                <th>Current Approver</th>
                <th>Risk Flag</th>
              </tr>
            </thead>
            <tbody>
              {highValueInvoices.map(invoice => (
                <Tooltip key={invoice.id}>
                  <TooltipTrigger asChild>
                    <tr className="cursor-pointer">
                      <td className="font-mono text-sm">{invoice.invoiceNo}</td>
                      <td>{invoice.vendor}</td>
                      <td className="font-semibold">{formatCurrency(invoice.amount)}</td>
                      <td>
                        <span className={`font-medium ${
                          invoice.aging > 15 ? 'text-severe' :
                          invoice.aging > 7 ? 'text-critical' :
                          invoice.aging > 3 ? 'text-warning' :
                          'text-success'
                        }`}>
                          {invoice.aging} days
                        </span>
                      </td>
                      <td className="text-muted-foreground">{invoice.currentApprover}</td>
                      <td>
                        <RiskFlagBadge flag={invoice.riskFlag} />
                      </td>
                    </tr>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>Click to view invoice details and approval history</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
