import React, { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import LoaderButton from '../components/LoaderButton';
import { onError } from '../lib/errorLib';
import config from '../config';
import { s3Upload } from '../lib/awsLib';
import './NewFavourite.css';
import { createFavourite } from '../lib/apiLib';

export default function NewFavourite() {
  const file = useRef(null);
  const nav = useNavigate();
  const [artist, setArtist] = useState('');
  const [trackTitle, setTrackTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return artist.length > 0 && trackTitle.length > 0 && file.current;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      const attachment = file.current ? await s3Upload(file.current) : null;

      await createFavourite({ artist, trackTitle, attachment });
      nav('/favourites');
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="NewFavourite">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="artist" className="mb-3">
          <Form.Label>Artist</Form.Label>
          <Form.Control
            value={artist}
            type="text"
            onChange={(e) => setArtist(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="track-title" className="mb-3">
          <Form.Label>Track title</Form.Label>
          <Form.Control
            value={trackTitle}
            type="text"
            onChange={(e) => setTrackTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="track-file" className="mb-3">
          <Form.Label>Upload your track</Form.Label>
          <Form.Control onChange={handleFileChange} type="file" />
        </Form.Group>
        <LoaderButton
          block
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoaderButton>
      </Form>
    </div>
  );
}
