import { useState } from 'react';
import CountryDetails from './countryDetails';
import { useEffect } from 'react';

const CountryList = ({ countries, searchQuery, filteredCountries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (searchQuery === '') {
      setSelectedCountry(null);
    }
  }, [searchQuery]);

  const handleShowButton = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <ul>
        {searchQuery === ''
          ? countries.map((country) => (
              <li key={country.cca3}>{country.name.common}</li>
            ))
          : filteredCountries.length <= 10 &&
            filteredCountries.map((country) => (
              <div key={country.cca3}>
                <li style={{ display: 'inline-block', marginRight: '10px' }}>
                  {country.name.common}
                </li>
                <button onClick={() => handleShowButton(country)}>show</button>
              </div>
            ))}
      </ul>
      {selectedCountry && <CountryDetails country={selectedCountry} />}
    </div>
  );
};

export default CountryList;
