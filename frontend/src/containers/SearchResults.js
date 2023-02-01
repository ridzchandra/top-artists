import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Pagination from '../components/Pagination';
import Card from 'react-bootstrap/Card';
import GridSystem from '../components/GridSystem';
import './SearchResults.css';
import { capitalize } from '../lib/stringLib';

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

  if (artists.length === 0) {
    return (
      <div className="ErrorBoundary text-center">
        <h3>No results! Please try another country.</h3>
      </div>
    );
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleArtistClick = (name) => {
    navigate(`/artist/${name}`);
  };

  return (
    <div>
      <h2 className="pb-3 mt-4 mb-3 border-bottom">
        Top Artists in {capitalize(params.country)}
      </h2>
      <div className="artists-container">
        <GridSystem colCount={2} md={6}>
          {artists
            .slice((currentPage - 1) * 5, currentPage * 5)
            .map((artist, index) => (
              <div
                key={artist.name}
                onClick={() => handleArtistClick(artist.name)}
              >
                <Card style={{ width: '174px', marginBottom: '30px' }}>
                  <Card.Img
                    variant="top"
                    src={currentImageUrls[index]}
                    height="174px"
                    width="174px"
                    className="artist-thumbnail"
                    alt={artist.name}
                  />
                  <Card.Body>
                    <Card.Title className="artist-title">
                      <span>{artist.name}</span>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </div>
            ))}
        </GridSystem>
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
