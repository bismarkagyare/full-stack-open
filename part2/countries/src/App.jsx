import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [countriesSearch, setCountriesSearch] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countriesData = await axios.get(
          'https://restcountries.com/v3.1/all'
        );
        setCountries(countriesData.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setCountriesSearch(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, countries]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <form>
        <label htmlFor="find countries">find countries: </label>
        <input type="text" value={search} onChange={handleSearch} />
      </form>
      <div>
        {countriesSearch.map((country) => {
          return <p key={country.cca3}>{country.name.common}</p>;
        })}
      </div>
    </>
  );
};

export default App;
