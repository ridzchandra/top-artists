import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import config from '../config';
import { Alert, Badge, Button } from 'react-bootstrap';
import Pagination from '../components/Pagination';
import { PlusIcon } from '@heroicons/react/24/outline';
import { createFavourite } from '../lib/apiLib';
import './styles/ArtistTopTracks.css';

const ArtistTopTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [addedTrack, setAddedTrack] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${params.name}&api_key=${config.LAST_FM_KEY}&format=json`
      );
      setTracks(response.data.toptracks.track);
      setTotalPages(Math.ceil(response.data.toptracks.track.length / 10));
    };

    fetchData();
  }, [params.name]);

  useEffect(() => {
    if (addedTrack) {
      createFavourite(addedTrack);
      setTimeout(() => setAddedTrack(null), 3000);
    }
  }, [addedTrack]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const addBtnEl = e.currentTarget;
    const trackListItem = addBtnEl.parentElement.parentElement;
    const artist = params.name;
    const trackTitle = trackListItem.firstChild.data;
    const attachment = trackListItem.href;
    setAddedTrack({ artist, trackTitle, attachment });
  };

  return (
    <div>
      <h2 className="pb-3 mt-4 mb-3 border-bottom">
        {params.name} Top Tracks{' '}
      </h2>
      <ListGroup>
        {tracks.slice((currentPage - 1) * 10, currentPage * 10).map((track) => (
          <ListGroup.Item
            action
            href={track.url}
            target="_blank"
            key={track.name}
            className="track-list-item"
          >
            {track.name}
            <div className="secondary-list-item">
              <Badge bg="secondary" className="mr-3">
                listeners: {track.listeners}
              </Badge>
              <Button variant="light" size="sm" onClick={handleAdd}>
                <PlusIcon width={24} height={24} color="blue" />
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {addedTrack && (
        <Alert
          className="mt-3"
          variant="success"
        >{`${addedTrack.trackTitle} has been added to your favourites!`}</Alert>
      )}
    </div>
  );
};

export default ArtistTopTracks;
