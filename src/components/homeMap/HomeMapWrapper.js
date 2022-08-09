import { Wrapper } from "@googlemaps/react-wrapper";
import HomeMap from "./HomeMap.js";
import { mapKey } from "../../config.js";
import Marker from "./Marker";
import { useEffect, useState } from "react";

function HomeMapWrapper({ upcomingTrips }) {
  const [center, setCenter] = useState({});
  const [zoom, setZoom] = useState(0);

  // const positions = [
  //   { lat: 41.567151, lng: 2.521516 },
  //   { lat: 41.568281, lng: 2.529608 },
  //   { lat: 41.57028, lng: 2.53375 },
  // ];

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
