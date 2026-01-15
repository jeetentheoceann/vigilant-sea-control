import { RoleProvider } from '@/contexts/RoleContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Dashboard } from '@/components/dashboard/Dashboard';

const Index = () => {
  return (
    <ThemeProvider>
      <RoleProvider>
        <Dashboard />
      </RoleProvider>
    </ThemeProvider>
  );
};

export default Index;
