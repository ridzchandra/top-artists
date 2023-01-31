import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import Signup from './containers/Signup';
import NewNote from './containers/NewNote';
import Notes from './containers/Notes';
import Settings from './containers/Settings';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import ArtistTopTracks from './containers/ArtistTopTracks';
import SearchResults from './containers/SearchResults';
import { Favourites } from './containers/Favourites';

export default function Links() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route
        path="/login"
        element={
          <UnauthenticatedRoute>
            <Login />
          </UnauthenticatedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <UnauthenticatedRoute>
            <Signup />
          </UnauthenticatedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <AuthenticatedRoute>
            <Settings />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/favourites"
        element={
          <AuthenticatedRoute>
            <Favourites />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/artists/:country"
        element={
          <AuthenticatedRoute>
            <SearchResults />
          </AuthenticatedRoute>
        }
      />
      <Route
        path="/artist/:name"
        element={
          <AuthenticatedRoute>
            <ArtistTopTracks />
          </AuthenticatedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />;
    </Routes>
  );
}
