import React from 'react';
import { Bell, Moon, Sun, ChevronDown, Ship, User } from 'lucide-react';
import { useRole, roleLabels } from '@/contexts/RoleContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserRole } from '@/types/dashboard';

const SLAStatusPill: React.FC<{ status: 'green' | 'amber' | 'red' }> = ({ status }) => {
  const statusConfig = {
    green: { bg: 'bg-success', text: 'text-success-foreground', label: 'SLA Compliant' },
    amber: { bg: 'bg-warning', text: 'text-warning-foreground', label: 'SLA At Risk' },
    red: { bg: 'bg-critical', text: 'text-critical-foreground', label: 'SLA Breached' },
  };

  const config = statusConfig[status];

  return (
    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      {config.label}
    </div>
  );
};

const RoleBadge: React.FC<{ role: UserRole }> = ({ role }) => {
  return (
    <div className="px-3 py-1.5 bg-primary/10 text-primary rounded-md text-sm font-medium border border-primary/20">
      {roleLabels[role]}
    </div>
  );
};

export const GlobalHeader: React.FC = () => {
  const { currentRole, setCurrentRole, slaStatus, userName, notificationCount } = useRole();
  const { theme, toggleTheme } = useTheme();

  const roles: UserRole[] = ['director', 'gm', 'hod', 'operator', 'uploader', 'agent'];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left: Logo & Company */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-md">
            <Ship className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground tracking-tight">IAS DMS</span>
            <span className="text-xs text-muted-foreground">Sharaf Shipping Agency</span>
          </div>
        </div>

        {/* Center: Role Badge */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                <RoleBadge role={currentRole} />
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuLabel>Switch Role (Demo)</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {roles.map(role => (
                <DropdownMenuItem
                  key={role}
                  onClick={() => setCurrentRole(role)}
                  className={currentRole === role ? 'bg-accent' : ''}
                >
                  {roleLabels[role]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <SLAStatusPill status={slaStatus} />

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-critical text-critical-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium hidden md:inline">{userName}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Preferences</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-critical">Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
