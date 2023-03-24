import DashboardProvider from './DashboardProvider';
import Dashboard from './Dashboard';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = () => (
  <DashboardProvider>
    <Dashboard />
  </DashboardProvider>
);

export default DashboardLayout;
