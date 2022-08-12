import { useEffect, useState } from "react";
import { openWeatherKey } from "../../config";
import Spinner from "react-bootstrap/Spinner";

function Weather({ coordinates }) {
  //******STATES*/
  const [currentWeather, setCurrentWeather] = useState({});
  const [loadedWeather, setLoadedWeather] = useState(false);

  //******EFFECT*/
  useEffect(() => {
    async function getWeather() {
      try {
        const LAT = coordinates.lat;
        const LON = coordinates.lng;
        const RESPONSE = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${openWeatherKey}&units=metric&lang=es`
        );
        const DATA = await RESPONSE.json();
        setCurrentWeather(DATA);
        setLoadedWeather(true);
      } catch (err) {
        console.error("There was an error connecting to the Open Weather API");
      }
    }
    getWeather();
  }, [coordinates]);

  return (
    <>
      {loadedWeather ? (
        <div className="d-flex align-items-baseline">
          <small className="text-light fw-regular">
            Current weather in {currentWeather.name} →
          </small>
          <div style={{ width: "30px" }}>
            <img
              className="img-fluid"
              alt={`weather in ${currentWeather.name}`}
              src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`}
            />
          </div>
        </div>
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
}

export default Weather;
