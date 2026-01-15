import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { reworkTrends, topIssues } from '@/data/mockData';
import { AlertCircle, User, FileType, Building } from 'lucide-react';
import { Tooltip as UITooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { IssuesDetailSheet } from './IssuesDetailSheet';

const RepeatIndicatorIcon: React.FC<{ type?: 'vendor' | 'type' | 'user' }> = ({ type }) => {
  if (!type) return null;

  const icons = {
    vendor: <Building className="w-3 h-3" />,
    type: <FileType className="w-3 h-3" />,
    user: <User className="w-3 h-3" />,
  };

  const labels = {
    vendor: 'Same vendor pattern detected',
    type: 'Same invoice type pattern',
    user: 'Same user pattern detected',
  };

  return (
    <UITooltip>
      <TooltipTrigger>
        <span className="flex items-center gap-1 text-warning">
          {icons[type]}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>{labels[type]}</p>
      </TooltipContent>
    </UITooltip>
  );
};

export const QualityRework: React.FC = () => {
  const [issuesOpen, setIssuesOpen] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Quality & Rework Intelligence</h2>
        <button 
          onClick={() => setIssuesOpen(true)}
          className="text-sm text-primary hover:underline font-medium"
        >
          View All Issues →
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Rework Trends Chart */}
        <div className="dashboard-card p-4">
          <h3 className="text-sm font-semibold mb-4">Rework Trends (Last 7 Days)</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reworkTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar
                  dataKey="reclassifications"
                  name="Reclassifications"
                  fill="hsl(var(--warning))"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="rejections"
                  name="Rejections"
                  fill="hsl(var(--critical))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Top Issues */}
        <div className="dashboard-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Top Rejection Reasons</h3>
            <span className="text-xs text-muted-foreground">This Month</span>
          </div>

          <div className="space-y-3">
            {topIssues.map((issue, index) => (
              <UITooltip key={index}>
                <TooltipTrigger asChild>
                  <div 
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-md hover:bg-muted transition-colors cursor-pointer"
                    onClick={() => setIssuesOpen(true)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-critical/10 text-critical flex items-center justify-center text-xs font-semibold">
                        {index + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{issue.reason}</span>
                        <RepeatIndicatorIcon type={issue.repeatIndicator} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{issue.count}</span>
                      <AlertCircle className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="left" className="max-w-xs">
                  <p className="font-medium">{issue.reason}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {issue.repeatIndicator
                      ? `Pattern detected: Same ${issue.repeatIndicator} involved in multiple cases. Consider targeted training or process review.`
                      : 'Click to view affected invoices and take action.'}
                  </p>
                </TooltipContent>
              </UITooltip>
            ))}
          </div>
        </div>
      </div>

      <IssuesDetailSheet open={issuesOpen} onOpenChange={setIssuesOpen} />
    </div>
  );
};
