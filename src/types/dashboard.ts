export type UserRole = 'uploader' | 'operator' | 'hod' | 'gm' | 'director' | 'agent';

export type SLAStatus = 'green' | 'amber' | 'red';

export interface KPICard {
  id: string;
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  status: 'compliant' | 'attention' | 'breach';
  prefix?: string;
  suffix?: string;
  visibleTo: UserRole[];
}

export interface AgingBucket {
  id: string;
  label: string;
  range: string;
  count: number;
  value: number;
  status: 'green' | 'amber' | 'red' | 'severe';
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  vendor: string;
  amount: number;
  aging: number;
  currentApprover: string;
  riskFlag: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'approved' | 'rejected' | 'disputed';
}

export interface AuditFlag {
  id: string;
  type: string;
  label: string;
  count: number;
  severity: 'warning' | 'critical';
}

export interface TrendDataPoint {
  date: string;
  slaAdherence: number;
  approvalLatency: number;
  uploadDelays: number;
}

export interface DepartmentComparison {
  department: string;
  compliance: number;
  pending: number;
}

export interface ReworkTrend {
  date: string;
  reclassifications: number;
  rejections: number;
}

export interface TopIssue {
  reason: string;
  count: number;
  repeatIndicator?: 'vendor' | 'type' | 'user';
}
