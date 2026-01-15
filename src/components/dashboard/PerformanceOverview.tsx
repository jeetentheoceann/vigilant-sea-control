import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { useRole } from '@/contexts/RoleContext';
import { trendData, departmentComparison } from '@/data/mockData';
import { FileCheck, Clock, RefreshCw } from 'lucide-react';

const MetricCard: React.FC<{ icon: React.ReactNode; label: string; value: string; subtext?: string }> = ({
  icon,
  label,
  value,
  subtext,
}) => (
  <div className="dashboard-card p-4">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div>
        <p className="kpi-label">{label}</p>
        <p className="text-xl font-bold">{value}</p>
        {subtext && <p className="text-xs text-muted-foreground">{subtext}</p>}
      </div>
    </div>
  </div>
);

export const PerformanceOverview: React.FC = () => {
  const { currentRole } = useRole();
  const showDepartmentComparison = ['director', 'gm'].includes(currentRole);

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Performance Overview</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: KPI Summary Cards */}
        <div className="space-y-4">
          <MetricCard
            icon={<FileCheck className="w-5 h-5" />}
            label={currentRole === 'uploader' ? 'Uploaded This Week' : 'Approved This Week'}
            value="127"
            subtext="vs 118 last week (+7.6%)"
          />
          <MetricCard
            icon={<Clock className="w-5 h-5" />}
            label={currentRole === 'uploader' ? 'Avg Upload Time' : 'Avg Approval Time'}
            value="2.4 hrs"
            subtext="Target: 4 hrs"
          />
          <MetricCard
            icon={<RefreshCw className="w-5 h-5" />}
            label="Reclassification Count"
            value="8"
            subtext="Down from 14 last week"
          />
        </div>

        {/* Right: Trend Visualization */}
        <div className="dashboard-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">
              {showDepartmentComparison ? 'Department Comparison' : 'Trend (Last 7 Days)'}
            </h3>
            <select className="text-xs bg-muted px-2 py-1 rounded border-0">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>

          <div className="h-[200px]">
            {showDepartmentComparison ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentComparison} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                  <YAxis dataKey="department" type="category" width={80} tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="compliance" name="SLA Compliance %" fill="hsl(var(--success))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
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
                  <Line
                    type="monotone"
                    dataKey="slaAdherence"
                    name="SLA Adherence %"
                    stroke="hsl(var(--success))"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="uploadDelays"
                    name="Upload Delays"
                    stroke="hsl(var(--warning))"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
