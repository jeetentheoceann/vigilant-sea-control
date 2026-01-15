import React from 'react';
import { auditFlags } from '@/data/mockData';
import { AlertTriangle, Flag, ChevronRight, Shield, UserX, Calendar, Settings, MapPin } from 'lucide-react';

const flagIcons: Record<string, React.ReactNode> = {
  'sod-breach': <UserX className="w-5 h-5" />,
  'backdated': <Calendar className="w-5 h-5" />,
  'manual-override': <Settings className="w-5 h-5" />,
  'role-changes': <Shield className="w-5 h-5" />,
  'ip-anomaly': <MapPin className="w-5 h-5" />,
};

export const AuditCompliance: React.FC = () => {
  const criticalFlags = auditFlags.filter(f => f.severity === 'critical');
  const warningFlags = auditFlags.filter(f => f.severity === 'warning');

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Audit & Compliance</h2>
      </div>

      <div className="dashboard-card">
        <div className="dashboard-card-header bg-critical-muted border-critical/20">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-critical" />
            <span className="text-sm font-semibold text-critical">Critical Flags ({criticalFlags.length})</span>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {criticalFlags.map(flag => (
            <div key={flag.id} className="audit-flag">
              <div className="w-10 h-10 rounded-md bg-critical/20 flex items-center justify-center text-critical">
                {flagIcons[flag.type] || <Flag className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{flag.label}</p>
                <p className="text-xs text-muted-foreground">Requires immediate review</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-critical text-critical-foreground flex items-center justify-center text-sm font-bold">
                  {flag.count}
                </span>
                <button className="text-sm text-primary hover:underline flex items-center gap-1">
                  View Details <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border">
          <div className="dashboard-card-header bg-warning-muted border-warning/20 border-t-0">
            <div className="flex items-center gap-2">
              <Flag className="w-4 h-4 text-warning" />
              <span className="text-sm font-semibold text-warning">Warning Flags ({warningFlags.length})</span>
            </div>
          </div>

          <div className="p-4 space-y-3">
            {warningFlags.map(flag => (
              <div key={flag.id} className="flex items-center gap-4 p-3 rounded-md bg-muted/50 hover:bg-muted transition-colors">
                <div className="w-10 h-10 rounded-md bg-warning/10 flex items-center justify-center text-warning">
                  {flagIcons[flag.type] || <Flag className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{flag.label}</p>
                  <p className="text-xs text-muted-foreground">Monitor and review as needed</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-warning/20 text-warning flex items-center justify-center text-sm font-bold">
                    {flag.count}
                  </span>
                  <button className="text-sm text-primary hover:underline flex items-center gap-1">
                    View Details <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
