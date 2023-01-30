import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import { Box, IconButton } from '@mui/material';

import useResponsive from '../../hooks/useResponsive';

import { PATH_USER } from '../../routes/paths';

import { RootStyle, ToolbarStyle } from './DashboardLayoutConfig';

import Iconify from '../../Components/Iconify';

interface DashboardNavbarProps {
  onOpenSidebar: () => void;
}

export default function DashboardNavbar({ onOpenSidebar }: DashboardNavbarProps) {
  const navigate = useNavigate();
  const isDesktop = useResponsive('up', 'md', 0, 0);

  return (
    <RootStyle>
      <ToolbarStyle>
        <Box sx={{ flexGrow: 1 }} />

        {!isDesktop && (
          <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Iconify icon={'heroicons-outline:menu-alt-2'} sx={{ width: 28, height: 28, ml: 1 }} />
          </IconButton>
        )}

        <IconButton
          onClick={() => navigate(PATH_USER.account, { replace: true })}
          sx={{ color: 'text.primary' }}
        >
          <Avatar
            sx={{
              bgcolor: '#201e20',
              color: '#fff',
            }}
          >
            A
          </Avatar>
        </IconButton>
      </ToolbarStyle>
    </RootStyle>
  );
}
