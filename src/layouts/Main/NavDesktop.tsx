// @ts-nocheck
import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import {
  Box,
  Link,
  Grid,
  List,
  Stack,
  Popover,
  ListItem,
  ListSubheader,
  Button,
} from '@mui/material';

import Iconify from '../../Components/Iconify';
import { PATH_AUTH } from '../../routes/paths';
import { AuthContext } from '../../AuthContext/Authcontext';

const LinkStyle = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.common.black,
  marginRight: theme.spacing(5),
  textDecoration: 'none',
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    opacity: 0.48,
    textDecoration: 'none',
  },
}));

const ListItemStyle = styled(ListItem)(({ theme }) => ({
  ...theme.typography.body2,
  padding: 0,
  marginTop: theme.spacing(3),
  color: theme.palette.text.secondary,
  transition: theme.transitions.create('color'),
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));

// ----------------------------------------------------------------------

function IconBullet({ type = 'item' }) {
  return (
    <Box sx={{ width: 24, height: 16, display: 'flex', alignItems: 'center' }}>
      <Box
        component="span"
        sx={{
          ml: '2px',
          width: 4,
          height: 4,
          borderRadius: '50%',
          bgcolor: 'currentColor',
          ...(type !== 'item' && { ml: 0, width: 8, height: 2, borderRadius: 2 }),
        }}
      />
    </Box>
  );
}
IconBullet.propTypes = {
  type: PropTypes.oneOf(['item', 'subheader']),
};

// ----------------------------------------------------------------------

function NavDesktopItem({ item, isHome, isOpen, isOffset, onOpen, onClose }) {
  const { title, path, children } = item;

  if (children) {
    return (
      <>
        <LinkStyle
          onClick={onOpen}
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            ...(isHome && { color: 'common.black' }),
            ...(isOffset && { color: 'common.black' }),
            ...(isOpen && { opacity: 0.48 }),
          }}
        >
          {title}
          <Iconify
            icon={isOpen ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
            sx={{ width: 19, height: 19 }}
          />
        </LinkStyle>
        <Popover
          open={isOpen}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 80, left: 0 }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={onClose}
          PaperProps={{
            sx: {
              px: 3,
              pt: 5,
              pb: 3,
              right: 16,
              m: 'auto',
              borderRadius: 2,
              maxWidth: (theme) => theme.breakpoints.values.sm,
              boxShadow: (theme) => theme.customShadows.z24,
            },
          }}
        >
          <Grid container spacing={3}>
            {children.map((list) => {
              const { subheader, items } = list;

              return (
                <Grid key={subheader} item xs={6}>
                  <List disablePadding>
                    <ListSubheader
                      disableSticky
                      disableGutters
                      sx={{
                        display: 'flex',
                        lineHeight: 'unset',
                        alignItems: 'center',
                        color: 'primary.main',
                        typography: 'overline',
                      }}
                    >
                      <IconBullet type="subheader" />

                      {subheader}
                    </ListSubheader>

                    {items.map((itemNav) => (
                      <ListItemStyle
                        key={itemNav.title}
                        to={itemNav.path}
                        component={RouterLink}
                        underline="none"
                        sx={{
                          '&.active': {
                            color: 'text.primary',
                            typography: 'subtitle2',
                          },
                        }}
                      >
                        <IconBullet />
                        {itemNav.title}
                      </ListItemStyle>
                    ))}
                  </List>
                </Grid>
              );
            })}
          </Grid>
        </Popover>
      </>
    );
  }

  return (
    <LinkStyle
      to={path}
      component={RouterLink}
      end={path === '/'}
      sx={{
        ...(isHome && { color: 'common.black' }),
        ...(isOffset && { color: 'text.primary' }),
        '&.active': {
          color: 'primary.main',
        },
      }}
    >
      {title}
    </LinkStyle>
  );
}
NavDesktopItem.propTypes = {
  isHome: PropTypes.bool,
  isOffset: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  item: PropTypes.shape({
    path: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes?.array || PropTypes.func,
  }),
};

NavDesktopItem.defaultProps = { isHome: false, isOffset: false };

// ----------------------------------------------------------------------

export default function NavDesktop({ isLoggedIn, isOffset, isHome, navConfig }) {
  // console.log('IsLoggedIn: ', isLoggedIn);
  const { logout } = useContext(AuthContext);
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Stack direction="row" alignItems="center">
      {navConfig.map((link) => (
        <NavDesktopItem
          key={link.title}
          item={link}
          isOpen={open}
          onOpen={handleOpen}
          onClose={handleClose}
          isOffset={isOffset}
          isHome={isHome}
        />
      ))}
      {isLoggedIn ? (
        <Button variant="contained" sx={{ ml: 2 }} component={RouterLink} to="/auth/login" onClick={logout}>
          Se déconnecter
        </Button>
      ) : (
        <Button
          variant="contained"
          sx={{ ml: 2 }}
          component={RouterLink}
          to={PATH_AUTH.login}
          color="primary"
        >
          Connexion
        </Button>
      )}
    </Stack>
  );
}
NavDesktop.propTypes = {
  isHome: PropTypes.bool,
  isOffset: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  navConfig: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
};
