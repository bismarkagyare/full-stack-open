import WeatherReport from './WeatherReport';

const CountryDetails = ({ country }) => {
  const { name, capital, area, languages, flag } = country;

  return (
    <div>
      <h1>{name.common}</h1>
      <p>capital: {capital}</p>
      <p>area: {area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.entries(languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <p>flag: {flag}</p>
      <h2>Weather in {capital}</h2>
      <WeatherReport city={capital} />
    </div>
  );
};

export default CountryDetails;
