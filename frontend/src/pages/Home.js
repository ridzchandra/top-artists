import React from 'react';
import { SearchBar } from '../components/SearchBar';
import { useSelector } from 'react-redux';
import './styles/Home.css';

export default function Home() {
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );

  function renderLander() {
    return (
      <div className="lander">
        <h1>Top Artists</h1>
        <p className="text-muted">A simple app to browse through artists</p>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? <SearchBar /> : renderLander()}
    </div>
  );
}
