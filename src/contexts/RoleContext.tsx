import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole, SLAStatus } from '@/types/dashboard';

interface RoleContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  slaStatus: SLAStatus;
  userName: string;
  notificationCount: number;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('director');
  const [slaStatus] = useState<SLAStatus>('amber');
  const [userName] = useState('Ahmed Al-Rashid');
  const [notificationCount] = useState(3);

  return (
    <RoleContext.Provider value={{
      currentRole,
      setCurrentRole,
      slaStatus,
      userName,
      notificationCount,
    }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

export const roleLabels: Record<UserRole, string> = {
  uploader: 'Uploader',
  operator: 'Operator',
  hod: 'Head of Department',
  gm: 'General Manager',
  director: 'Director',
  agent: 'Agent',
};

export const canViewFinancialRisk = (role: UserRole): boolean => {
  return ['hod', 'gm', 'director'].includes(role);
};

export const canViewAuditCompliance = (role: UserRole): boolean => {
  return ['gm', 'director'].includes(role);
};

export const isAgentRole = (role: UserRole): boolean => {
  return role === 'agent';
};
