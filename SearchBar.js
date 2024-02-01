import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        onChange={handleChange}
        placeholder="Enter city name"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
