import React from './Mainapp';

const CurrentWeather = ({ weatherData }) => {
  const { main, weather, wind } = weatherData;
  const { temp, temp_min, temp_max, humidity } = main;
  const { speed, deg } = wind;
  const { description, icon } = weather[0];

  return (
    <div>
      <div>Temperature: {temp}°C</div>
      <div>Min Temperature: {temp_min}°C</div>
      <div>Max Temperature: {temp_max}°C</div>
      <div>Humidity: {humidity}%</div>
      <div>Wind Speed: {speed} m/s</div>
      <div>Wind Direction: {deg}°</div>
      <div>Description: {description}</div>
      <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather icon" />
    </div>
  );
};

export default CurrentWeather;
