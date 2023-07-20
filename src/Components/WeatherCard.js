import React from "react";

const WeatherCard = ({ formatTimestamp, weatherData }) => {
  const city = weatherData.cities[0].city;
  const country = weatherData.cities[0].country;
  const time = formatTimestamp(weatherData.cities[0].currentMeasurement.ts);
  const aqiMeasurement = weatherData.cities[0].currentMeasurement.aqius;
  const img = weatherData.news[0].thumbnail;
  const newsTitle = weatherData.news[0].title;
  const newsUrl = weatherData.news[0].url;
  return (
    <div className="weathercard">
      <div>
        <div className="aqi-container">
          <h2>
            {city}, {country}.
          </h2>
          <h2>
            Current AQI Measurement:{" "}
            <span
              className={
                aqiMeasurement < 30
                  ? "healthy"
                  : aqiMeasurement >= 30 && aqiMeasurement < 60
                  ? "moderate"
                  : "danger"
              }
            >
              {aqiMeasurement}{" "}
            </span>
            <span className="span-msg">
              {aqiMeasurement < 30
                ? "(healthy)"
                : aqiMeasurement >= 30 && aqiMeasurement < 60
                ? "(moderate)"
                : "(unhealthy)"}
            </span>
          </h2>

          <p className="time">
            <small>Updated on {time}</small>
          </p>
        </div>
      </div>
      <p>News:</p>
      <img className="news-img" src={img} alt="news image" />

      <a href={newsUrl} target="_blank">
        <p className="news">{newsTitle}</p>
      </a>
    </div>
  );
};

export default WeatherCard;
