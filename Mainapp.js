import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import Forecast from './ForeCast';
import UnitToggle from './UnitToggle';

const API_KEY = 'YOUR_API_KEY';

const Mainapp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [unit, setUnit] = useState('celsius');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (city !== '') {
        setLoading(true);
        setError(null);

        try {
          const [currentResponse, forecastResponse] = await Promise.all([
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`),
            fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
          ]);

          if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error('City not found');
          }

          const currentData = await currentResponse.json();
          const forecastData = await forecastResponse.json();

          setWeatherData(currentData);
          setForecastData(parseForecastData(forecastData));
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [city]);

  const parseForecastData = (data) => {
    // Extract relevant information from the API response and format it
    const formattedForecastData = data.list.map(item => ({
      date: item.dt_txt,
      temperature: item.main.temp,
      description: item.weather[0].description,
      icon: item.weather[0].icon
    }));
  
    // Group forecast data by date
    const groupedForecastData = {};
    formattedForecastData.forEach(item => {
      const date = item.date.split(' ')[0]; // Extract date part
      if (!groupedForecastData[date]) {
        groupedForecastData[date] = [];
      }
      groupedForecastData[date].push(item);
    });
  
    // Calculate average temperature for each date
    const averagedForecastData = Object.keys(groupedForecastData).map(date => {
      const items = groupedForecastData[date];
      const totalTemperature = items.reduce((sum, item) => sum + item.temperature, 0);
      const averageTemperature = totalTemperature / items.length;
      return {
        date,
        averageTemperature,
        description: items[0].description, // Use the description from the first item for simplicity
        icon: items[0].icon // Use the icon from the first item for simplicity
      };
    });
  
    return averagedForecastData;
  };
  

  const handleSearch = (city) => {
    setCity(city);
  };

  const handleToggleUnit = (selectedUnit) => {
    setUnit(selectedUnit);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {weatherData && <CurrentWeather weatherData={weatherData} unit={unit} />}
      {forecastData && <Forecast forecastData={forecastData} unit={unit} />}
      <UnitToggle unit={unit} onToggle={handleToggleUnit} />
    </div>
  );
};

export default Mainapp;
