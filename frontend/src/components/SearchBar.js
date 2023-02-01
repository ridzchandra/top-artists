import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/SearchBar.css';

export const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <div className="container">
      <div className="row height d-flex justify-content-center align-items-center">
        <div className="col-md-8">
          <div className="search">
            <i className="fa fa-search"></i>
            <input
              type="text"
              className="form-control"
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
              className="btn btn-primary mt"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
