import React, { useState } from 'react';
import './search.css';  // Ensure the search.css file is correctly linked

const SearchBar = () => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  const today = new Date('2025-02-02');
  const minDate = new Date('2000-01-01');

  const handleSearch = () => {
    if (!destination.trim()) {
      setError('Please enter your destination.');
    } else {
      setError('');
      console.log({ destination, startDate, endDate });
    }
  };

  return (
    <div className="search-bar">
      <div className="input-group">
        <input
          type="text"
          placeholder="Where are you going?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="input-field"
        />
        {error && <span className="error-message">{error}</span>}
      </div>

      <input
        type="date"
        value={startDate}
        min={minDate.toISOString().split('T')[0]}
        onChange={(e) => setStartDate(e.target.value)}
        className="date-field"
      />

      <input
        type="date"
        value={endDate}
        min={minDate.toISOString().split('T')[0]}
        onChange={(e) => setEndDate(e.target.value)}
        className="date-field"
      />

      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;

