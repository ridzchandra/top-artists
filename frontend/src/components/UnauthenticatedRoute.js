import React, { cloneElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Reads the redirect URL from the querystring.
function querystring(name, url = window.location.href) {
  const parsedName = name.replace(/[[]]/g, '\\$&');
  const regex = new RegExp(`[?&]${parsedName}(=([^&#]*)|&|#|$)`, 'i');
  const results = regex.exec(url);

  if (!results || !results[2]) {
    return false;
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export default function UnauthenticatedRoute(props) {
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );
  const { children } = props;
  const redirect = querystring('redirect');

  if (isAuthenticated) {
    return <Navigate to={redirect || '/'} />;
  }

  return cloneElement(children, props);
}
