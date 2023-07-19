import React, { useState } from 'react';
import Loader from './Components/Loader';
import WeatherCard from './Components/WeatherCard';

import CloudIcon from './Utils/CloudIcon';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const API_KEY=process.env.REACT_APP_API_KEY;

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchFromAPI = async () => {
    if (searchTerm.length == 0) {
      setError('Input field is empty!');
      return null;
    }
    const url = `https://airvisual1.p.rapidapi.com/v2/auto-complete?q=${searchTerm}&x-user-lang=en-US&x-user-timezone=Asia%2FSingapore&x-aqi-index=us&x-units-pressure=mbar&x-units-distance=kilometer&x-units-temperature=celsius`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'airvisual1.p.rapidapi.com',
      },
    };

    try {
      setLoading(true);
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const result = await response.json();
      if (result.data.cities.length === 0) {
        setError('Please enter valid location');
        setLoading(false);
        setSearchTerm('');
        return null;
      }
      console.log(result.data);
      if (!result.data || result.data.cities.length === 0) {
        throw new Error('No weather data available for the location');
      }
      setWeatherData(result.data);
      setLoading(false);
      setError('');
      setSearchTerm('');
    } catch (error) {
      console.error(error);
      setError('Failed to fetch data');
      setLoading(false);
      setWeatherData(null);
      setSearchTerm('');
    }
  };

  const handleSearch = () => {
    fetchFromAPI();
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'UTC',
    };

    return date.toLocaleString('en-US', options);
  };

  return (
    <div className="main">
      <header>
        <div className="header">
          <a className="icon" href="/">
            <CloudIcon />
          </a>
          <h1 className="title"> Air Quality Index</h1>
        </div>
      </header>

      <div className="search-container">
        <input
          className="search-input"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Enter location..., eg. London"
        />

        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading && <Loader />}

      {error && <p className="alarm">{error}</p>}

      {weatherData && (
        <div>
          <WeatherCard
            weatherData={weatherData}
            formatTimestamp={formatTimestamp}
          />
        </div>
      )}
    </div>
  );
};

export default App;
