import { alpha, styled } from '@mui/material/styles';
import { AppBar, Toolbar } from '@mui/material';

// Appbar ConfigStyle for DashboardLayout and DashboardNavbar

const DRAWER_WIDTH = 320;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

export const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: '0px 3px 6px rgb(0 0 0 / 16%)',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

export const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));
