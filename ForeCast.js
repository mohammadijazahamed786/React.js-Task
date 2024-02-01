import React from './Mainapp';

const Forecast = ({ forecastData }) => {
  return (
    <div>
      {forecastData.map((day, index) => (
        <div key={index}>
          <div>Date: {day.date}</div>
          <div>Average Temperature: {day.temp}°C</div>
          <div>Description: {day.description}</div>
          <img src={`http://openweathermap.org/img/w/${day.icon}.png`} alt="weather icon" />
        </div>
      ))}
    </div>
  );
};

export default Forecast;
