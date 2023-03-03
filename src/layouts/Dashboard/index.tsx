import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';

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
  maxHeight: 'calc(100vh)',
  paddingTop: APP_BAR_DESKTOP + 24,
  paddingBottom: theme.spacing(0),
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
    <Header />
    <MainStyle>
      <Outlet />
    </MainStyle>
  </RootStyle>
);

export default DashboardLayout;
