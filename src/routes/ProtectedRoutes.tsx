import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ isAuthorize, children, redirectTo }: any) => {
  if (isAuthorize) {
    return children;
  }
  return <Navigate to={redirectTo} replace />;
};

export default ProtectedRoutes;
