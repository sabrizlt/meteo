import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

const API_KEY = "4c68fa6be8106f17b8f39fd39e34f72e";

function tempConverter(kelvin) {
  const celsius = kelvin - 273.15;
  return Math.floor(celsius * 100) / 100;
}

const FavTowns = () => {
  const dispatch = useDispatch();
  const favContent = useSelector((state) => state.favourite.content);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const fetchedData = [];
      for (const town of favContent) {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${town}&appid=${API_KEY}`
          );
          const data = await response.json();
          fetchedData.push(data);
        } catch (error) {
          console.error(error);
        }
      }
      const romeIndex = fetchedData.findIndex((data) => data.name === "Rome");
      if (romeIndex > -1) {
        const romeData = fetchedData.splice(romeIndex, 1)[0];
        fetchedData.unshift(romeData);
      }
      setWeatherData(fetchedData);
    };
  
    fetchWeatherData();
  }, [favContent]);
  

  return (
    <div>
      <h2 className="text-light text-center mt-5">Le mie città:</h2>
      <div >
        {weatherData.map((data, i) => {
          return (
            <Card
            className="text-center mx-auto w-100"
              key={data.name + i}
              style={{ width: "18rem", marginBottom: "1rem" }}
            >
              <Card.Body className="preferita">
                <Card.Title className="top">
                  <Link to={`/${data.name}`}>{data.name}</Link>
                  <p className="mt-3 fs-1">
                    {data.main && data.main.temp
                      ? Math.round(tempConverter(data.main.temp)) + "°C"
                      : "N/A"}
                  </p>
                </Card.Title>
                <Button
                  className="m-2"
                  variant="danger"
                  onClick={() => {
                    dispatch({
                      type: "REMOVE_FROM_FAV",
                      payload: data.name,
                    });
                  }}
                >
                  Remove
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FavTowns;