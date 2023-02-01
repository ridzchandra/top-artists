import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
import Routes from './Routes';
import { LinkContainer } from 'react-router-bootstrap';
import { AppContext } from './lib/contextLib';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { onError } from './lib/errorLib';
import ErrorBoundary from './components/ErrorBoundary';
import logo from './assets/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import {
  loadSession,
  setIsAuthenticated,
  setIsAuthenticating,
} from './redux-toolkit/reducers/authenticationSlice';

function App() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );
  const isAuthenticating = useSelector(
    (state) => state.authentication.isAuthenticating
  );

  const onLoad = async () => {
    try {
      await Auth.currentSession();
      dispatch(setIsAuthenticated(true));
    } catch (e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }

    dispatch(setIsAuthenticating(false));
  };

  useEffect(() => {
    onLoad();
  }, []);

  async function handleLogout() {
    await Auth.signOut();

    dispatch(setIsAuthenticated(false));
    nav('/login');
  }

  return (
    !isAuthenticating && (
      <div className="App container py-3">
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3 px-3">
          <LinkContainer to="/">
            <Navbar.Brand className="font-weight-bold text-muted">
              <img src={logo} alt="Top Artists"></img>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              {isAuthenticated ? (
                <>
                  <LinkContainer to="/favourites">
                    <Nav.Link>Favourites</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/settings">
                    <Nav.Link>Settings</Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </div>
    )
  );
}
export default App;
