import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, Clock, UserCog, MapPin } from 'lucide-react';
import { auditFlags } from '@/data/mockData';

interface AuditDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  auditType?: string;
}

const auditDetails: Record<string, { icon: React.ElementType; items: { id: string; description: string; user: string; date: string; severity: string }[] }> = {
  'sod-breach': {
    icon: Shield,
    items: [
      { id: 'SOD-001', description: 'Same user uploaded and approved INV-2024-0847', user: 'John Smith', date: '2024-01-07 14:32', severity: 'critical' },
      { id: 'SOD-002', description: 'Approval without HOD review for high-value invoice', user: 'Sarah Chen', date: '2024-01-06 09:15', severity: 'critical' },
      { id: 'SOD-003', description: 'Self-approval detected for INV-2024-0823', user: 'Mike Rahman', date: '2024-01-05 16:45', severity: 'critical' },
    ],
  },
  'backdated': {
    icon: Clock,
    items: [
      { id: 'BD-001', description: 'Invoice dated 3 days before upload', user: 'Agent: Port Services', date: '2024-01-07 10:00', severity: 'warning' },
      { id: 'BD-002', description: 'Sail date already passed at upload time', user: 'Agent: Gulf Shipping', date: '2024-01-06 11:30', severity: 'warning' },
      { id: 'BD-003', description: 'Document timestamp mismatch detected', user: 'Agent: Maritime LLC', date: '2024-01-06 08:45', severity: 'warning' },
    ],
  },
  'manual-override': {
    icon: UserCog,
    items: [
      { id: 'MO-001', description: 'SLA deadline manually extended by 5 days', user: 'M. Hassan (GM)', date: '2024-01-07 15:20', severity: 'warning' },
      { id: 'MO-002', description: 'Approval limit override for INV-2024-0891', user: 'Director', date: '2024-01-06 14:00', severity: 'warning' },
      { id: 'MO-003', description: 'Vendor status changed from blocked to active', user: 'S. Khan (HOD)', date: '2024-01-05 09:30', severity: 'warning' },
    ],
  },
  'role-changes': {
    icon: UserCog,
    items: [
      { id: 'RC-001', description: 'User promoted from Operator to HOD', user: 'Admin', date: '2024-01-07 08:00', severity: 'info' },
      { id: 'RC-002', description: 'New agent account created', user: 'Admin', date: '2024-01-06 10:15', severity: 'info' },
      { id: 'RC-003', description: 'Approval limit increased for user', user: 'GM', date: '2024-01-05 14:30', severity: 'warning' },
    ],
  },
  'ip-anomaly': {
    icon: MapPin,
    items: [
      { id: 'IP-001', description: 'Login from unusual location (Nigeria)', user: 'John Smith', date: '2024-01-07 03:45', severity: 'critical' },
      { id: 'IP-002', description: 'Multiple failed login attempts followed by success', user: 'Sarah Chen', date: '2024-01-06 22:30', severity: 'critical' },
    ],
  },
};

export const AuditDetailSheet: React.FC<AuditDetailSheetProps> = ({ open, onOpenChange, auditType }) => {
  const allItems = auditType 
    ? auditDetails[auditType]?.items || []
    : Object.values(auditDetails).flatMap(d => d.items);

  const flag = auditFlags.find(f => f.type === auditType);

  const getSeverityBadge = (severity: string) => {
    const variants: Record<string, string> = {
      critical: 'bg-critical/10 text-critical border-critical/20',
      warning: 'bg-warning/10 text-warning border-warning/20',
      info: 'bg-primary/10 text-primary border-primary/20',
    };
    return variants[severity] || variants.info;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            {auditType ? flag?.label || 'Audit Details' : 'Full Audit Log'}
          </SheetTitle>
          <SheetDescription>
            {allItems.length} audit events found. Review each item for compliance verification.
          </SheetDescription>
        </SheetHeader>

        {!auditType && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {auditFlags.map((af) => (
              <div 
                key={af.id}
                className={`p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors ${
                  af.severity === 'critical' ? 'border-critical/30 bg-critical/5' : 'border-warning/30 bg-warning/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{af.label}</span>
                  <Badge variant="outline" className={getSeverityBadge(af.severity)}>
                    {af.count}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">Description</TableHead>
                <TableHead className="font-semibold">User</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Severity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allItems.map((item) => (
                <TableRow key={item.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-mono text-sm">{item.id}</TableCell>
                  <TableCell className="max-w-[200px]">{item.description}</TableCell>
                  <TableCell>{item.user}</TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{item.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getSeverityBadge(item.severity)}>
                      {item.severity}
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
