import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Building2, FileType, User } from 'lucide-react';
import { topIssues, reworkTrends } from '@/data/mockData';

interface IssuesDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const repeatIcons: Record<string, React.ElementType> = {
  vendor: Building2,
  type: FileType,
  user: User,
};

export const IssuesDetailSheet: React.FC<IssuesDetailSheetProps> = ({ open, onOpenChange }) => {
  const totalReclassifications = reworkTrends.reduce((sum, t) => sum + t.reclassifications, 0);
  const totalRejections = reworkTrends.reduce((sum, t) => sum + t.rejections, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl">Quality & Rework Issues</SheetTitle>
          <SheetDescription>
            Detailed breakdown of all rework issues and quality concerns.
          </SheetDescription>
        </SheetHeader>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-lg border border-warning/30 bg-warning/5">
            <p className="text-sm text-muted-foreground">Total Reclassifications</p>
            <p className="text-2xl font-bold text-warning">{totalReclassifications}</p>
            <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
          </div>
          <div className="p-4 rounded-lg border border-critical/30 bg-critical/5">
            <p className="text-sm text-muted-foreground">Total Rejections</p>
            <p className="text-2xl font-bold text-critical">{totalRejections}</p>
            <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
          </div>
        </div>

        {/* Top Issues Table */}
        <h3 className="font-semibold mb-3">Top Rejection Reasons</h3>
        <div className="border rounded-lg overflow-hidden mb-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Reason</TableHead>
                <TableHead className="font-semibold text-center">Count</TableHead>
                <TableHead className="font-semibold">Pattern</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topIssues.map((issue, idx) => {
                const RepeatIcon = issue.repeatIndicator ? repeatIcons[issue.repeatIndicator] : null;
                
                return (
                  <TableRow key={idx} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{issue.reason}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-critical/10 text-critical border-critical/20">
                        {issue.count}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {RepeatIcon && (
                        <div className="flex items-center gap-2 text-warning">
                          <RepeatIcon className="w-4 h-4" />
                          <span className="text-sm capitalize">Same {issue.repeatIndicator}</span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Daily Breakdown */}
        <h3 className="font-semibold mb-3">Daily Breakdown (Last 7 Days)</h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold text-center">Reclassifications</TableHead>
                <TableHead className="font-semibold text-center">Rejections</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reworkTrends.map((trend, idx) => (
                <TableRow key={idx}>
                  <TableCell>{trend.date}</TableCell>
                  <TableCell className="text-center">
                    <span className={trend.reclassifications > 5 ? 'text-warning font-semibold' : ''}>
                      {trend.reclassifications}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={trend.rejections > 3 ? 'text-critical font-semibold' : ''}>
                      {trend.rejections}
                    </span>
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
