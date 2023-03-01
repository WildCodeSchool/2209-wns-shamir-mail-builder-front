// import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
// import DashboardNavbar from './DashboardNavbar';
import Header from '../Main/Header';
// import DashboardSidebar from './DashboardSidebar';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
  backgroundColor: '#f5f5f5',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_DESKTOP + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.down('md')]: {
    paddingTop: APP_BAR_MOBILE + 50,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = () => (
  <RootStyle>
    {/* <DashboardNavbar onOpenSidebar={() => setOpen(true)} /> */}
    <Header />
    {/* <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} /> */}
    <MainStyle>
      <Outlet />
    </MainStyle>
  </RootStyle>
);

export default DashboardLayout;
