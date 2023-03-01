// @ts-nocheck
import { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { Box, AppBar, Toolbar, Container } from '@mui/material';

import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';

import { HEADER } from '../../config/Config';

import Logo from '../../Components/Logo';

import NavDesktop from './NavDesktop';
import NavMobile from './NavMobile';
import navConfig from './NavConfig';
import { AuthContext } from '../../AuthContext/Authcontext';

const ToolbarStyle: any = styled(Toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
  },
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: 'calc(100% - 48px)',
  boxShadow: theme.customShadows.z8,
}));

export default function Header() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

  useEffect(() => {
    if (user !== null) {
      setIsLoggedIn(true);
    }
    if (user === null) {
      setIsLoggedIn(false);
      navigate('/auth/login');
    }
  }, [user]);

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'md');

  const isHome = pathname === '/';

  return (
    <AppBar sx={{ boxShadow: 3, bgcolor: isOffset ? 'background.paper' : 'transparent' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
          }),
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Logo sx={{ mx: 'auto', width: { xs: 90, sm: 100, md: 120 } }} />

          <Box sx={{ flexGrow: 1 }} />

          {isDesktop && (
            <NavDesktop
              isLoggedIn={isLoggedIn}
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />
          )}

          {!isDesktop && (
            <NavMobile
              isLoggedIn={isLoggedIn}
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />
          )}
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
