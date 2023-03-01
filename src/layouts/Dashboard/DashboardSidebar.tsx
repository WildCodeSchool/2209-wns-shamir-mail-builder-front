import { useEffect } from 'react';

import { Box, Drawer, Typography } from '@mui/material';

import NavSection from '../NavSection';
import sidebarConfig from './SidebarConfig';
import useResponsive from '../../hooks/useResponsive';

interface DashboardSidebarProps {
  isOpenSidebar: boolean;
  onCloseSidebar: VoidFunction;
}

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }: DashboardSidebarProps) {
  const isDesktop = useResponsive('up', 'lg', 0, 0);

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [isDesktop]);

  const renderContent = (
    <Box sx={{ px: 2, py: 3 }}>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
          Composant Template
        </Typography>
      </Box>
      <NavSection sidebarConfig={sidebarConfig} />
    </Box>
  );

  return (
    <Drawer
      open={isDesktop ? false : isOpenSidebar}
      onClose={onCloseSidebar}
      variant="persistent"
      PaperProps={{
        sx: {
          width: 320,
          bgcolor: (theme) => theme.palette.background.default,
          overflow: 'hidden',
        },
      }}
    >
      {renderContent}
    </Drawer>
  );
}
