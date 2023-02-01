import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export default function AuthenticatedRoute({ children }) {
  const { pathname, search } = useLocation();
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${pathname}${search}`} />;
  }

  return children;
}
