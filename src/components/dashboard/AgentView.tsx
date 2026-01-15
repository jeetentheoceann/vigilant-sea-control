import React from 'react';
import { agentData } from '@/data/mockData';
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export const AgentView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">My Invoice Summary</h2>
        <button className="text-sm text-primary hover:underline font-medium">
          View All My Invoices →
        </button>
      </div>

      {/* Agent KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="dashboard-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="kpi-label">My Invoices</p>
              <p className="kpi-value">{agentData.ownInvoices}</p>
            </div>
          </div>
        </div>

        <div className="dashboard-card p-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-md flex items-center justify-center ${
              agentData.submissionDelay > 2 ? 'bg-critical/10 text-critical' : 'bg-success/10 text-success'
            }`}>
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="kpi-label">Avg Delay vs Sail Date</p>
              <p className="kpi-value">{agentData.submissionDelay} days</p>
              <p className="text-xs text-muted-foreground">Before sail date</p>
            </div>
          </div>
        </div>

        <div className="dashboard-card p-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-md flex items-center justify-center ${
              agentData.complianceScore >= 85 ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
            }`}>
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="kpi-label">Compliance Score</p>
              <p className="kpi-value">{agentData.complianceScore}%</p>
              <p className="text-xs text-muted-foreground">Target: 90%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rejection Reasons */}
      <div className="dashboard-card">
        <div className="dashboard-card-header flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-critical" />
            <h3 className="text-sm font-semibold">Recent Rejection Reasons</h3>
          </div>
          <button className="text-sm text-primary hover:underline font-medium">
            View Details →
          </button>
        </div>
        <div className="p-4 space-y-3">
          {agentData.rejectionReasons.map((reason, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-critical/10 text-critical flex items-center justify-center text-xs font-semibold">
                  {index + 1}
                </span>
                <span className="text-sm">{reason.reason}</span>
              </div>
              <span className="text-sm font-bold text-critical">{reason.count}</span>
            </div>
          ))}
        </div>
        <div className="px-4 pb-4">
          <p className="text-xs text-muted-foreground">
            Review rejection reasons to improve your compliance score. Contact your supervisor for training if needed.
          </p>
        </div>
      </div>

      {/* Restricted Notice */}
      <div className="p-4 bg-muted rounded-md border border-border">
        <p className="text-sm text-muted-foreground text-center">
          You are viewing your own invoice data only. Department and financial metrics are not available for your role.
        </p>
      </div>
    </div>
  );
};
