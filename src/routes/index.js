import { Suspense, lazy } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';

import { Typography } from '@mui/material';
import PublicLayout from '../layouts/Main';

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<Typography> ... chargement</Typography>}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    // Public Routes
    {
      path: '/',
      element: <PublicLayout />,
      children: [
        {
          element: <HomePage />,
          index: true,
        },
        {
          path: 'subscription',
          element: <Subscription />,
        },
        {
          path: 'documentation',
          element: <Documentation />,
        },
      ],
    },
    {
      path: '/auth',
      element: <PublicLayout />,
      children: [
        {
          path: 'login',
          element: <Login />,
        },
      ],
    },
    // User Routes
    {
      path: '/user',
      element: <PublicLayout />,
      children: [
        {
          path: 'account',
          element: <UserAccount />,
        },
      ],
    },

    // App MailBuilder
    {
      path: '/app',
      element: <PublicLayout />,
      children: [
        {
          path: 'home',
          element: <HomeBuilder />,
        },
      ],
    },
  ]);
}

/**
 * Export des pages de l'application en lazy loading (chargement à la demande)
 * Améliore les performances de l'application en ne chargeant que les pages nécessaires
 */

/**
 * Public Routes  (Routes publiques)
 */
const HomePage = Loadable(lazy(() => import('../Pages/HomePage')));
const Subscription = Loadable(lazy(() => import('../Pages/Subscription')));
const Documentation = Loadable(lazy(() => import('../Pages/Documentation')));

/**
 * Auth Routes  (Routes de l'espace authentification)
 */

const Login = Loadable(lazy(() => import('../Pages/Auth/Login')));

/**
 * User Routes  (Routes de l'espace utilisateur)
 */

const UserAccount = Loadable(lazy(() => import('../Pages/User/Account')));

/**
 * App MailBuilder  - Routes de l'application MailBuilder
 */

const HomeBuilder = Loadable(lazy(() => import('../Pages/App/HomeBuilder')));
