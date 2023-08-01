const CountryList = ({ countries, searchQuery, filteredCountries }) => {
  return (
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
  );
};

export default CountryList;
