import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";

const API_KEY = "4c68fa6be8106f17b8f39fd39e34f72e";

function tempConverter(kelvin) {
  const celsius = kelvin - 273.15;
  return Math.floor(celsius * 100) / 100;
}

const RandomCitiesCarousel = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      const citiesNames = [
        "London",
        "Paris",
        "Rome",
        "New York",
        "Tokyo",
        "Sydney",
        "Moscow",
        "Madrid",
        "Dubai",
        "Beijing",
      ];

      const citiesPromises = citiesNames.map(async (cityName) => {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
        );
        const data = await response.json();
        const city = data[0];
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}`
        );
        const weatherData = await weatherResponse.json();
        const temperature = Math.round(tempConverter(weatherData.main.temp));
        return { cityName, temperature };
      });

      const citiesData = await Promise.all(citiesPromises);
      setCities(citiesData);
    };

    fetchCities();
  }, []);

  return (
    <Carousel indicators={false}>
      {cities.map((city) => (
        <Carousel.Item key={city.cityName} className="mt-5">
        <div className="carousel-item-overlay">
          <h3 className="text-center text-light">{city.cityName}</h3>
          <h4 className="text-center text-light">{city.temperature}°C</h4>
        </div>
       
      </Carousel.Item>
      
      ))}
    </Carousel>
  );
};

export default RandomCitiesCarousel;
