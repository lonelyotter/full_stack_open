import { useState, useEffect } from "react";
import axios from "axios";

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many countries, specify another filter</div>;
  } else if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />;
  } else {
    return <CountriesList countries={countries} />;
  }
};

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map((language, i) => {
          return <li key={i}>{language}</li>;
        })}
      </ul>
      <img src={country.flags.png} alt={"flag"} />
      <Weather capital={country.capital}></Weather>
    </div>
  );
};

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);
  const access_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${access_key}&query=${capital}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [capital, access_key]);

  if (weather) {
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <div>temperature {weather.current.temperature} Celsius</div>
        <img src={weather.current.weather_icons[0]} alt={"weather icon"} />
        <div>wind {(weather.current.wind_speed / 3.6).toFixed(2)} m/s</div>
      </div>
    );
  } else {
    return null;
  }
};

const CountriesList = ({ countries }) => {
  const [showCountry, setShowCountry] = useState(
    Array(countries.length).fill(false)
  );

  const handleShowCountry = (event) => {
    const index = Number(event.target.value);
    const newShowCountry = [...showCountry];
    newShowCountry[index] = !newShowCountry[index];
    setShowCountry(newShowCountry);
  };

  return (
    <div>
      {countries.map((country, i) => {
        return (
          <div key={i}>
            <div>
              {country.name.common}{" "}
              <button onClick={handleShowCountry} value={i}>
                {showCountry[i] ? "hide" : "show"}
              </button>
            </div>
            {showCountry[i] ? <CountryDetails country={country} /> : null}
          </div>
        );
      })}
    </div>
  );
};

export default Countries;
