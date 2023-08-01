import { useState, useEffect } from 'react';
import axios from 'axios';

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

      {countryInfo &&
        filteredCountries.map((country) => (
          <div key={country.cca3}>
            <h1>{country.name.common}</h1>
            <p>capital:{country.capital}</p>
            <p>area:{country.area}</p>
            <h3>Languages</h3>
            <ul>
              {Object.entries(country.languages).map(([key, value]) => (
                <li key={key}>{value}</li>
              ))}
            </ul>
            <p>flag:{country.flag}</p>
          </div>
        ))}

      {!countryInfo && (
        <ul>
          {searchQuery === ''
            ? countries.map((country) => (
                <li key={country.cca3}>{country.name.common}</li>
              ))
            : filteredCountries.length <= 10 &&
              filteredCountries.map((country) => (
                <li key={country.cca3}>{country.name.common}</li>
              ))}
        </ul>
      )}
    </div>
  );
};

export default App;
