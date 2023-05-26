// @ts-nocheck
import { useLocation, Outlet, useOutlet, Navigate } from 'react-router-dom';

import { Box, Container, Stack, Typography } from '@mui/material';

import LogoColor from '../../Components/LogoColor';

import Header from './Header';

export default function PublicLayout() {
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const isHome = pathname === '/';

  if (!outlet) {
    return <Navigate to={'/'} replace />;
  }

  return (
    <Stack sx={{ minHeight: 1 }}>
      <Header />

      <Outlet />

      <Box sx={{ flexGrow: 1 }} />

      {!isHome ? null : (
        <Box
          sx={{
            py: 5,
            textAlign: 'center',
            position: 'relative',
            boxShadow: 3,
            bgcolor: '#111111',
          }}
        >
          <Container>
            <LogoColor
              sx={{
                mb: 2,
                mx: 'auto',
                width: {
                  xs: 80,
                  sm: 105,
                  md: 130,
                },
              }}
            />
            <Box sx={{ color: 'text.secondary' }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <b>
                  Le site de référence pour les professionnels ayant des exigences en matière de
                  diffusion de mail
                </b>
              </Typography>
            </Box>
          </Container>
        </Box>
      )}
    </Stack>
  );
}
