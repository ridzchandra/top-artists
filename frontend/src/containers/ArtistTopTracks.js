import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

const ArtistTopTracks = () => {
  const [tracks, setTracks] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${params.name}&api_key=${config.LAST_FM_KEY}&format=json`
      );
      setTracks(response.data.toptracks.track);
    };

    fetchData();
  }, [params.name]);

  return (
    <div>
      <h1>{params.name} Top Tracks</h1>
      <ul>
        {tracks.map((track) => (
          <li key={track.name}>{track.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistTopTracks;
