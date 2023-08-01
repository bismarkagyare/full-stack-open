import { useState, useEffect } from 'react';
import axios from 'axios';
import CountryList from './components/countryList';
import CountryDetails from './components/countryDetails';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data))
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayMessage = searchQuery && filteredCountries.length > 10;
  const countryInfo = searchQuery && filteredCountries.length === 1;

  return (
    <div>
      <label htmlFor="countrySearch">find countries: </label>
      <input
        type="text"
        id="countrySearch"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {displayMessage && (
        <p>Too many matches, make your query more specific.</p>
      )}

      {countryInfo && <CountryDetails country={filteredCountries[0]} />}

      {!countryInfo && (
        <CountryList
          countries={countries}
          searchQuery={searchQuery}
          filteredCountries={filteredCountries}
        />
      )}
    </div>
  );
};

export default App;
