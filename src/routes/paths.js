function path(root, sublink) {
  return `${root}${sublink}`;
}

// ROOTS ========================================================== //

const ROOTS_PUBLIC = '/';
const ROOTS_AUTH = '/auth';
const ROOTS_USER = '/user';
const ROOTS_SUB = '/sub';

// PATH_AUTH ========================================================== //

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  verifyEmail: (token) => path(ROOTS_AUTH, `/verify-email/${token}`),
  subSuccess: path(ROOTS_AUTH, '/success'),
  subCancel: path(ROOTS_AUTH, '/cancel'),
};

// PATH_USER ========================================================== //

export const PATH_USER = {
  root: ROOTS_USER,
  account: path(ROOTS_USER, '/account'),
};

// PATH APP ============================================================= //

export const PATH_APP = {
  root: '/app',
  app: path('/app', '/home'),
};

// PATH PUBLIC ========================================================== //

export const PATH_PUBLIC = {
  root: ROOTS_PUBLIC,
  documentation: '/documentation',
  subscription: '/subscription',
};

// PATH SUB ============================================================= //

export const PATH_SUB = {
  root: ROOTS_SUB,
  success: '/success',
  cancel: '/cancel',
};
