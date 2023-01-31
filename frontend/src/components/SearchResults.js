import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Pagination from './Pagination';
import './SearchResults.css';

const SearchResults = () => {
  const [artists, setArtists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentImageUrls, setCurrentImageUrls] = useState([]);
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

  useEffect(() => {
    const getArtistImagesByMBID = async (artists, currentPage) => {
      const musicBrainzUrls = artists
        .slice((currentPage - 1) * 5, currentPage * 5)
        .map((artist) => {
          const { mbid } = artist;
          return mbid
            ? 'https://musicbrainz.org/ws/2/artist/' +
                mbid +
                '?inc=url-rels&fmt=json'
            : '';
        });
      const responses = await Promise.all(
        musicBrainzUrls.map((url) => axios.get(url))
      );
      // The following lines of code are just destructuring the musicbrainz response for img urls
      const imageRelations = responses.map((res) =>
        res.data.relations.find((rel) => rel.type === 'image')
      );
      const imageUrls = imageRelations.map((ir) => {
        let imageUrl =
          'https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png';
        if (ir) {
          imageUrl = ir.url.resource;
          if (imageUrl.startsWith('https://commons.wikimedia.org/wiki/File:')) {
            const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
            imageUrl =
              'https://commons.wikimedia.org/wiki/Special:Redirect/file/' +
              filename;
          }
        }
        return imageUrl;
      });
      setCurrentImageUrls(imageUrls);
    };
    getArtistImagesByMBID(artists, currentPage);
  }, [artists, currentPage]);

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
              <img
                className="artist-thumbnail"
                src={currentImageUrls[index]}
                alt={artist.name}
                height="174px"
                width="174px"
              />
              {/* <img src={artist.image[2]['#text']} alt={artist.name} /> */}
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
