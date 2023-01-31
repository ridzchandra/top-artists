import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import config from '../config';
import { Badge } from 'react-bootstrap';
import './ArtistTopTracks.css';
import Pagination from '../components/Pagination';

const ArtistTopTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
            <Badge bg="primary">listeners: {track.listeners}</Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ArtistTopTracks;
