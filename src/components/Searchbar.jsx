import { useState } from "react";
import { ListGroup, Dropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom/dist";

const API_KEY = "4c68fa6be8106f17b8f39fd39e34f72e";

function tempConverter(kelvin) {
  const celsius = kelvin - 273.15;
  return Math.floor(celsius * 100) / 100;
}

const Searchbar = function () {
  const [town, setTown] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  const fetchSuggestions = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${town}&limit=5&appid=${API_KEY}`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await fetchSuggestions();
  };

  const onSelectTown = async (townName, country) => {
    setTown(`${townName}, ${country}`);
    setSuggestions([]);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${townName}&appid=${API_KEY}`
      );
      const data = await response.json();
      setWeatherData([data]);
      setError(null);
      console.log(data);
    } catch (error) {
      console.error(error);
      setError("City not found");
      setWeatherData([]);
    }
  };

  return (
    <>
      <Form className="d-flex mt-5 searchbar" onSubmit={handleSearch}>
        <Form.Control
          type="search"
          placeholder="Cerca una città"
          className="me-2"
          aria-label="Search"
          value={town}
          onChange={(e) => setTown(e.target.value)}
        />
        <Button variant="outline-light" type="submit">
          Cerca
        </Button>
      </Form>
      {suggestions.length > 0 && (
        <Dropdown.Menu show>
          {suggestions.map((suggestion, i) => (
            <Dropdown.Item
              key={i}
              onClick={() => onSelectTown(suggestion.name, suggestion.country)}
            >
              {suggestion.name}, {suggestion.country}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      )}
      {error && <p>{error}</p>}
      {weatherData.length > 0 && (
        <ListGroup className="mt-5 text-center">
          {weatherData.map((data, i) => (
            <ListGroup.Item className="city" key={data.name + i}>
              <h2>{data.name}</h2>
              <h3 className="fs-1">
                {data.main && data.main.temp
                  ? Math.round(tempConverter(data.main.temp)) + "°C"
                  : "N/A"}
              </h3>
              <p>
                Description:{" "}
                {data.weather && data.weather[0] && data.weather[0].description
                  ? data.weather[0].description
                  : "N/A"}
              </p>
              <Link to={"/town/" + data.name}>
                <Button className="bg-white text-primary px-4 border border-2 border-primary">
                  See More
                </Button>
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      
    </>
    
  );
};

export default Searchbar;
