import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAppContext } from '../lib/contextLib';
import { onError } from '../lib/errorLib';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import './Favourites.css';

export const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const favourites = await loadFavourites();
        setFavourites(favourites);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadFavourites() {
    return API.get('favourites', '/favourites', {});
  }

  function renderFavouritesList(favourites) {
    return (
      <>
        <LinkContainer to="/favouritess/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <ArrowUpTrayIcon width={17} />
            <span className="upload-text">Upload a track</span>
          </ListGroup.Item>
        </LinkContainer>
        {favourites.map(({ favouriteId, content, createdAt }) => (
          <LinkContainer key={favouriteId} to={`/favourites/${favouriteId}`}>
            <ListGroup.Item action>
              <span className="font-weight-bold">
                {content.trim().split('\n')[0]}
              </span>
              <br />
              <span className="text-muted">
                Created: {new Date(createdAt).toLocaleString()}
              </span>
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </>
    );
  }

  return (
    <div>
      <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Favourites</h2>
      <ListGroup>{!isLoading && renderFavouritesList(favourites)}</ListGroup>
    </div>
  );
};
