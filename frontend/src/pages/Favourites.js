import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { Alert, Badge, Button, ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { onError } from '../lib/errorLib';
import { ArrowUpTrayIcon, TrashIcon } from '@heroicons/react/24/outline';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import './styles/Favourites.css';

export const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deletedTrack, setDeletedTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const favourites = await loadFavourites();
        setFavourites(favourites);
        setTotalPages(Math.ceil(favourites.length / 10));
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated, deletedTrack]);

  useEffect(() => {
    if (deletedTrack) {
      setTimeout(() => setDeletedTrack(null), 3000);
    }
  }, [deletedTrack]);

  function loadFavourites() {
    return API.get('favourites', '/favourites', {});
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = ({ artist, trackTitle, favId }) => {
    API.del('favourites', `/favourites/${favId}`);
    setDeletedTrack({ artist, trackTitle });
  };

  function renderFavouritesList(favourites) {
    return (
      <>
        <LinkContainer to="/favourites/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <ArrowUpTrayIcon width={17} />
            <span className="upload-text">Upload a track</span>
          </ListGroup.Item>
        </LinkContainer>
        {favourites
          .slice((currentPage - 1) * 10, currentPage * 10)
          .map(({ artist, trackTitle, attachment, favId }) => (
            <ListGroup.Item
              action
              href={attachment}
              target="_blank"
              key={trackTitle}
              className="favourite-list-item"
            >
              {trackTitle}
              <div className="secondary-list-item">
                <Badge bg="secondary" className="mr-3">
                  Artist: {artist}
                </Badge>
                <Button
                  className="list-button"
                  variant="light"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete({ artist, trackTitle, favId });
                  }}
                >
                  <TrashIcon width={24} height={24} color="blue" />
                </Button>
              </div>
            </ListGroup.Item>
          ))}
      </>
    );
  }

  return (
    <div>
      <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Favourites</h2>
      {favourites ? (
        <>
          <ListGroup>
            {!isLoading && renderFavouritesList(favourites)}
          </ListGroup>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          {deletedTrack && (
            <Alert
              className="mt-3"
              variant="primary"
            >{`${deletedTrack.trackTitle} by ${deletedTrack.artist} has been deleted from your favourites!`}</Alert>
          )}
        </>
      ) : (
        <div className="NotFound text-center">
          <h3>You don't have any favourites yet!</h3>
        </div>
      )}
    </div>
  );
};
