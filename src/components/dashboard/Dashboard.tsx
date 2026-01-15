import React from 'react';
import { GlobalHeader } from './GlobalHeader';
import { KPIStrip } from './KPIStrip';
import { PerformanceOverview } from './PerformanceOverview';
import { SLAAgingControl } from './SLAAgingControl';
import { QualityRework } from './QualityRework';
import { FinancialRisk } from './FinancialRisk';
import { AuditCompliance } from './AuditCompliance';
import { AgentView } from './AgentView';
import { useRole, canViewFinancialRisk, canViewAuditCompliance, isAgentRole } from '@/contexts/RoleContext';

export const Dashboard: React.FC = () => {
  const { currentRole } = useRole();

  const showFinancialRisk = canViewFinancialRisk(currentRole);
  const showAuditCompliance = canViewAuditCompliance(currentRole);
  const isAgent = isAgentRole(currentRole);

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />

      <main className="pt-20 px-6 pb-8 max-w-[1600px] mx-auto">
        {isAgent ? (
          <AgentView />
        ) : (
          <>
            <KPIStrip />
            <PerformanceOverview />
            <SLAAgingControl />
            <QualityRework />
            {showFinancialRisk && <FinancialRisk />}
            {showAuditCompliance && <AuditCompliance />}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 px-6">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between text-xs text-muted-foreground">
          <span>IAS DMS v2.4.1 • Sharaf Shipping Agency</span>
          <span>Last synced: {new Date().toLocaleTimeString()}</span>
        </div>
      </footer>
    </div>
  );
};
