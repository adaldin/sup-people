import { Wrapper } from "@googlemaps/react-wrapper";
import HomeMap from "./HomeMap.js";
import { mapKey } from "../../config.js";
import Marker from "./Marker";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function HomeMapWrapper() {
  const [center, setCenter] = useState({});
  const [zoom, setZoom] = useState(0);
  const { state } = useLocation();
  const { upcomingTrips } = state;

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    function success(pos) {
      const lat = parseFloat(pos.coords.latitude);
      const lng = parseFloat(pos.coords.longitude);
      const crd = { lat, lng };
      setCenter(crd);
      setZoom(13);
    }

    function error(err) {
      const crd = { lat: 41.390205, lng: 2.154007 };
      setCenter(crd);
      setZoom(10);
      alert(
        `Oops! We can't find you:\nPlease, activate your current location to see the upcoming Sup Trips.`
      );
      console.warn("Error: ", err);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  useEffect(() => {}, []);
  return (
    <Wrapper apiKey={mapKey}>
      {center ? (
        <HomeMap center={center} zoom={zoom}>
          {upcomingTrips.map((trip, index) => (
            <Marker
              key={index}
              position={trip.coordinates.entryPoint}
              id={index}
            />
          ))}
        </HomeMap>
      ) : (
        "Loading"
      )}
    </Wrapper>
  );
}

export default HomeMapWrapper;
