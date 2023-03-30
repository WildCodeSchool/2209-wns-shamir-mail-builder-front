// import { Outlet } from 'react-router-dom';
import DashboardProvider from './DashboardProvider';
import Dashboard from './Dashboard';
// import Header from '../Main/Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = () => (
  <DashboardProvider>
    <Dashboard />
  </DashboardProvider>
);

export default DashboardLayout;
