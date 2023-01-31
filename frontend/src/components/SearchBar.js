import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

export const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <div class="container">
      <div class="row height d-flex justify-content-center align-items-center">
        <div class="col-md-8">
          <div class="search">
            <i class="fa fa-search"></i>
            <input
              type="text"
              class="form-control"
              placeholder="Type the country name"
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter')
                  navigate(`/artists/${searchInput.trim().toLowerCase()}`);
              }}
              value={searchInput}
            />
            <button
              onClick={() =>
                navigate(`/artists/${searchInput.trim().toLowerCase()}`)
              }
              class="btn btn-primary mt"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
