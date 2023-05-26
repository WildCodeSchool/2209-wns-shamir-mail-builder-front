import React from 'react';
import DashboardProvider from './DashboardProvider';
import Dashboard from './Dashboard';

const DashboardLayout: React.FC = () => (
  <DashboardProvider>
    <Dashboard />
  </DashboardProvider>
);

export default DashboardLayout;
