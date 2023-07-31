import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all countries when the page loads
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data))
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayMessage = searchQuery && filteredCountries.length > 10;

  return (
    <div>
      <label htmlFor="countrySearch">Search for a country: </label>
      <input
        type="text"
        id="countrySearch"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {displayMessage && (
        <p>Too many matches, make your query more specific.</p>
      )}

      <ul>
        {(searchQuery && filteredCountries.length <= 10
          ? filteredCountries
          : countries
        ).map((country) => (
          <li key={country.cca3}>{country.name.common}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
