import { Wrapper } from "@googlemaps/react-wrapper";
import HomeMap from "./HomeMap.js";
import { mapKey } from "../../config.js";
import { useState, useEffect } from "react";
import Marker from "./Marker";
// import { getAllTripsEntryPoints } from "../../services/mapsService/index.js";

function HomeMapWrapper({ upcomingTrip }) {
  console.log("upcomingtrip", upcomingTrip);
  const center = { lat: 41.567151, lng: 2.521516 };
  const positions = [
    { lat: 41.567151, lng: 2.521516 },
    { lat: 41.568281, lng: 2.529608 },
    { lat: 41.57028, lng: 2.53375 },
  ];

  const [newPositions, setNewPositions] = useState();

  // useEffect(() => {
  //   const entryPoints = getAllTripsEntryPoints(upcomingTrips);
  //   setNewPositions(entryPoints);
  // }, []);

  return (
    <Wrapper apiKey={mapKey}>
      <HomeMap center={center} zoom={12}>
        {positions.map((position, index) => (
          <Marker key={index} position={position} />
        ))}
      </HomeMap>
    </Wrapper>
  );
}

export default HomeMapWrapper;
