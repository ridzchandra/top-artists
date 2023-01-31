import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useAppContext } from '../lib/contextLib';
import { onError } from '../lib/errorLib';
import { API } from 'aws-amplify';
import { BsPencilSquare } from 'react-icons/bs';
import { LinkContainer } from 'react-router-bootstrap';
import './Home.css';
import { SearchBar } from '../components/SearchBar';

export default function Home() {
  const { isAuthenticated } = useAppContext();

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
