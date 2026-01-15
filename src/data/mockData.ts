import { KPICard, AgingBucket, Invoice, AuditFlag, TrendDataPoint, DepartmentComparison, ReworkTrend, TopIssue } from '@/types/dashboard';

export const kpiCards: KPICard[] = [
  {
    id: 'pending-actions',
    label: 'Pending Actions',
    value: 47,
    trend: 'up',
    trendValue: '+12%',
    status: 'attention',
    visibleTo: ['uploader', 'operator', 'hod', 'gm', 'director'],
  },
  {
    id: 'sla-compliance',
    label: 'SLA Compliance',
    value: '87.3%',
    trend: 'down',
    trendValue: '-2.1%',
    status: 'attention',
    visibleTo: ['operator', 'hod', 'gm', 'director'],
  },
  {
    id: 'pending-value',
    label: 'Pending Value',
    value: '₹24.7L',
    trend: 'up',
    trendValue: '+₹3.2L',
    status: 'attention',
    visibleTo: ['hod', 'gm', 'director'],
  },
  {
    id: 'over-sla-exposure',
    label: 'Over-SLA Exposure',
    value: '₹8.4L',
    trend: 'up',
    trendValue: '+₹1.8L',
    status: 'breach',
    visibleTo: ['hod', 'gm', 'director'],
  },
  {
    id: 'rework-ratio',
    label: 'Rework Ratio',
    value: '4.2%',
    trend: 'down',
    trendValue: '-0.8%',
    status: 'compliant',
    visibleTo: ['operator', 'hod', 'gm', 'director'],
  },
  {
    id: 'approved-today',
    label: 'Approved Today',
    value: 23,
    trend: 'up',
    trendValue: '+5',
    status: 'compliant',
    visibleTo: ['uploader', 'operator', 'hod'],
  },
];

export const agingBuckets: AgingBucket[] = [
  { id: '0-2', label: '0-2 Days', range: 'On Track', count: 156, value: 1245000, status: 'green' },
  { id: '3-6', label: '3-6 Days', range: 'Attention', count: 42, value: 870000, status: 'amber' },
  { id: '7-15', label: '7-15 Days', range: 'At Risk', count: 18, value: 520000, status: 'red' },
  { id: '15+', label: '15+ Days', range: 'Critical', count: 7, value: 340000, status: 'severe' },
];

export const highValueInvoices: Invoice[] = [
  { id: '1', invoiceNo: 'INV-2024-0847', vendor: 'Gulf Maritime Services', amount: 485000, aging: 12, currentApprover: 'M. Hassan (GM)', riskFlag: 'high', status: 'pending' },
  { id: '2', invoiceNo: 'INV-2024-0823', vendor: 'Port Authority Dubai', amount: 320000, aging: 8, currentApprover: 'S. Khan (HOD)', riskFlag: 'medium', status: 'pending' },
  { id: '3', invoiceNo: 'INV-2024-0891', vendor: 'Cargo Logistics LLC', amount: 275000, aging: 16, currentApprover: 'Director Review', riskFlag: 'critical', status: 'disputed' },
  { id: '4', invoiceNo: 'INV-2024-0812', vendor: 'Marine Equipment Co', amount: 198000, aging: 5, currentApprover: 'A. Rahman (HOD)', riskFlag: 'low', status: 'pending' },
  { id: '5', invoiceNo: 'INV-2024-0856', vendor: 'Shipping Partners Int', amount: 156000, aging: 11, currentApprover: 'M. Hassan (GM)', riskFlag: 'high', status: 'pending' },
];

export const auditFlags: AuditFlag[] = [
  { id: '1', type: 'sod-breach', label: 'Segregation of Duty Breaches', count: 3, severity: 'critical' },
  { id: '2', type: 'backdated', label: 'Back-dated Uploads', count: 7, severity: 'warning' },
  { id: '3', type: 'manual-override', label: 'Manual Overrides', count: 12, severity: 'warning' },
  { id: '4', type: 'role-changes', label: 'Access / Role Changes', count: 5, severity: 'warning' },
  { id: '5', type: 'ip-anomaly', label: 'IP / Location Anomalies', count: 2, severity: 'critical' },
];

export const trendData: TrendDataPoint[] = [
  { date: '01 Jan', slaAdherence: 92, approvalLatency: 2.1, uploadDelays: 4 },
  { date: '02 Jan', slaAdherence: 89, approvalLatency: 2.4, uploadDelays: 6 },
  { date: '03 Jan', slaAdherence: 91, approvalLatency: 2.2, uploadDelays: 3 },
  { date: '04 Jan', slaAdherence: 88, approvalLatency: 2.8, uploadDelays: 8 },
  { date: '05 Jan', slaAdherence: 85, approvalLatency: 3.1, uploadDelays: 12 },
  { date: '06 Jan', slaAdherence: 87, approvalLatency: 2.6, uploadDelays: 7 },
  { date: '07 Jan', slaAdherence: 87, approvalLatency: 2.5, uploadDelays: 5 },
];

export const departmentComparison: DepartmentComparison[] = [
  { department: 'Operations', compliance: 94, pending: 12 },
  { department: 'Finance', compliance: 88, pending: 23 },
  { department: 'Logistics', compliance: 82, pending: 31 },
  { department: 'Procurement', compliance: 91, pending: 8 },
  { department: 'Customs', compliance: 79, pending: 18 },
];

export const reworkTrends: ReworkTrend[] = [
  { date: '01 Jan', reclassifications: 4, rejections: 2 },
  { date: '02 Jan', reclassifications: 6, rejections: 3 },
  { date: '03 Jan', reclassifications: 3, rejections: 1 },
  { date: '04 Jan', reclassifications: 8, rejections: 5 },
  { date: '05 Jan', reclassifications: 5, rejections: 2 },
  { date: '06 Jan', reclassifications: 4, rejections: 3 },
  { date: '07 Jan', reclassifications: 3, rejections: 2 },
];

export const topIssues: TopIssue[] = [
  { reason: 'Missing PO Reference', count: 18, repeatIndicator: 'vendor' },
  { reason: 'Incorrect Tax Calculation', count: 12, repeatIndicator: 'type' },
  { reason: 'Vendor Details Mismatch', count: 9, repeatIndicator: 'vendor' },
  { reason: 'Late Submission', count: 7, repeatIndicator: 'user' },
  { reason: 'Duplicate Invoice', count: 5 },
];

export const riskSummary = {
  totalExposure: 2470000,
  underApproval: 1580000,
  approvedUnpaid: 640000,
  underDispute: 250000,
};

export const agentData = {
  ownInvoices: 24,
  submissionDelay: 1.2,
  complianceScore: 89,
  rejectionReasons: [
    { reason: 'Incomplete Documentation', count: 3 },
    { reason: 'Late Submission', count: 2 },
    { reason: 'Incorrect Classification', count: 1 },
  ],
};
