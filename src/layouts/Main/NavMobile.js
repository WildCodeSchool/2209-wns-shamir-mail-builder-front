import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';

import { alpha, styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  List,
  Link,
  Drawer,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Button,
} from '@mui/material';

import { NAVBAR } from '../../config/Config';

import Iconify from '../../Components/Iconify';
import Scrollbar from '../../Components/Scrollbar';
import Logo from '../../Components/Logo';

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  height: NAVBAR.DASHBOARD_ITEM_ROOT_HEIGHT,
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));

export default function NavMobile({ isLoggedIn, isOffset, isHome, navConfig }) {
  console.log('IsLoggedIn: ', isLoggedIn);
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  useEffect(() => {
    if (drawerOpen) {
      handleDrawerClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <MenuIcon
        onClick={handleDrawerOpen}
        sx={{
          ml: 1,
          cursor: 'pointer',
          ...(isHome && { color: 'common.black' }),
          ...(isOffset && { color: 'text.primary' }),
        }}
      />

      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { pb: 5, width: 260 } }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 6, my: 3 }} />

          <List disablePadding>
            {navConfig.map((link) => (
              <NavMobileItem key={link.title} item={link} isOpen={open} onOpen={handleOpen} />
            ))}
            <Box sx={{ mt: 4, textAlign: 'center', maxWidth: 120, mx: 'auto' }}>
              {isLoggedIn ? (
                <Button variant="outlined" to="/dashboard">
                  Se déconnecter
                </Button>
              ) : (
                <Button variant="outlined" to="/login">
                  Connexion
                </Button>
              )}
            </Box>
          </List>
        </Scrollbar>
      </Drawer>
    </>
  );
}
NavMobile.propTypes = {
  isOffset: PropTypes.bool,
  isHome: PropTypes.bool,
  navConfig: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string,
      icon: PropTypes.node,
      children: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
    }),
  ),
  isLoggedIn: PropTypes.bool,
};

// ---------------------------------------------------------------------- //

function NavMobileItem({ item, isOpen, onOpen }) {
  const { title, path, icon, children } = item;

  if (children) {
    return (
      <>
        <ListItemStyle onClick={onOpen}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText disableTypography primary={title} />
          <Iconify
            icon={isOpen ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <Box sx={{ flexGrow: 1 }}>
              <List disablePadding>
                {children.map((link) => (
                  <ListItemStyle
                    key={link.title}
                    component={RouterLink}
                    to={link.path}
                    sx={{
                      pl: 5,
                      ...(link.path === path && {
                        color: 'primary.main',

                        '& .MuiListItemIcon-root': {
                          color: 'primary.main',
                        },
                      }),
                    }}
                  >
                    <ListItemText disableTypography primary={link.subheader} />
                  </ListItemStyle>
                ))}
              </List>
            </Box>
          </Box>
        </Collapse>
      </>
    );
  }
  NavMobileItem.propTypes = {
    isOpen: PropTypes.bool,
    item: PropTypes.shape({
      children: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
      icon: PropTypes.node,
      path: PropTypes.string,
      title: PropTypes.string,
    }),
    onOpen: PropTypes.func,
  };

  if (title === 'Documentation') {
    return (
      <ListItemStyle href={path} target="_blank" rel="noopener" component={Link}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText disableTypography primary={title} />
      </ListItemStyle>
    );
  }

  return (
    <ListItemStyle
      to={path}
      component={RouterLink}
      end={path === '/'}
      sx={{
        '&.active': {
          color: 'primary.main',
          fontWeight: 'fontWeightMedium',
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        },
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText disableTypography primary={title} />
    </ListItemStyle>
  );
}
