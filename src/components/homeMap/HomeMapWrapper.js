import { Wrapper } from "@googlemaps/react-wrapper";
import HomeMap from "./HomeMap.js";
import { mapKey } from "../../config.js";
import Marker from "./Marker";

function HomeMapWrapper() {
  const center = { lat: 41.565253, lng: 2.521855 };
  const positions = [
    { lat: 41.567151, lng: 2.521516 },
    { lat: 41.568281, lng: 2.529608 },
    { lat: 41.57028, lng: 2.53375 },
  ];

  function handleClick() {
    console.log("marker clicked");
  }

  return (
    <Wrapper apiKey={mapKey}>
      <HomeMap center={center} zoom={12}>
        {positions.map((position, index) => (
          <Marker key={index} position={position} handleClick={handleClick} />
        ))}
      </HomeMap>
    </Wrapper>
  );
}

export default HomeMapWrapper;
