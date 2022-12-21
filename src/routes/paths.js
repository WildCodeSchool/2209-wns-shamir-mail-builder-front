function path(root, sublink) {
  return `${root}${sublink}`;
}

// ROOTS ========================================================== //

const ROOTS_PUBLIC = '/';
const ROOTS_AUTH = '/auth';
const ROOTS_USER = '/user';

// PATH_AUTH ========================================================== //

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  verifyEmail: (token) => path(ROOTS_AUTH, `/verify-email/${token}`),
};

// PATH_USER ========================================================== //

export const PATH_USER = {
  root: ROOTS_USER,
  account: path(ROOTS_USER, '/account'),
};

// PATH PUBLIC ========================================================== //

export const PATH_PUBLIC = {
  root: ROOTS_PUBLIC,
  documentation: '/documentation',
  subscription: '/subscription',
};
