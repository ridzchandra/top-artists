import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Pagination from './Pagination';

const SearchResults = () => {
  const [artists, setArtists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${params.country}&api_key=${config.LAST_FM_KEY}&format=json`
      );
      setArtists(response.data.topartists.artist);
      setTotalPages(Math.ceil(response.data.topartists.artist.length / 5));
    };

    fetchData();
  }, [params.country]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleArtistClick = (name) => {
    navigate(`/artist/${name}`);
  };

  return (
    <div className="notes">
      <h2 className="pb-3 mt-4 mb-3 border-bottom">
        Top Artists in {params.country}
      </h2>
      <div>
        {artists
          .slice((currentPage - 1) * 5, currentPage * 5)
          .map((artist, index) => (
            <div
              key={artist.name}
              onClick={() => handleArtistClick(artist.name)}
            >
              <h2>{artist.name}</h2>
              {/* <img
              src={currentImageUrls[index]}
              alt={artist.name}
              height="32px"
              width="32px"
            /> */}
              <img src={artist.image[2]['#text']} alt={artist.name} />
            </div>
          ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SearchResults;
