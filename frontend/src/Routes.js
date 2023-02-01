import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Settings from './pages/Settings';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import ArtistTopTracks from './pages/ArtistTopTracks';
import SearchResults from './pages/SearchResults';
import { Favourites } from './pages/Favourites';
import NewFavourite from './pages/NewFavourite';

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
        path="/favourites/new"
        element={
          <AuthenticatedRoute>
            <NewFavourite />
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
