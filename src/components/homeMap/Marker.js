import { useEffect, useState } from "react";
import useSupTrips from "../../context/SupTripsContext";

function Marker({ position, map, id }) {
  const [marker, setMarker] = useState();
  // custom hook to use context
  const { supTrips } = useSupTrips();
  console.log(supTrips[id].supTripName);
  useEffect(() => {
    const svgMarker = {
      path: "M11.5,4c-0.2-1.2-0.7-2.2-1.6-2.9C9.1,0.4,8.1,0,7,0C6.8,0,6.5,0,6.3,0.1c-1.2,0.2-2.2,0.8-3,1.8 C2.8,2.5,2.5,3.3,2.4,4.2c0,0.6,0,1.1,0.2,1.6c0.2,0.6,0.4,1.1,0.6,1.6C3.5,8.3,4,9.1,4.4,9.9c0.4,0.7,0.8,1.4,1.2,2 c0.4,0.7,0.8,1.3,1.3,1.9C7,14,7,14,7.1,13.9c0.7-1,1.4-2.1,2-3.2C9.5,10,10,9.2,10.3,8.4c0.4-0.8,0.8-1.6,1-2.5 C11.6,5.3,11.6,4.7,11.5,4z M5.6,3C5.9,2.7,6.4,2.6,7,2.6c0.6,0,1,0.1,1.4,0.4c0.2,0.2,0.4,0.4,0.5,0.8c0.1,0.4-0.2,0.4-0.6,0.4 C8.1,4.2,8.2,4,8.1,3.8C8,3.7,7.9,3.5,7.8,3.5c0,0-0.1,0-0.2,0c0-0.2-0.1-0.3-0.2-0.4C7.3,2.9,7.2,2.9,6.9,2.9 c-0.2,0-0.4,0.1-0.5,0.2C6.3,3.2,6.3,3.3,6.3,3.5C6,3.7,5.8,3.9,5.8,4.2c0,0.3,0.1,0.5,0.4,0.7C6.4,5,6.5,5,6.7,5.1 c0.1,0,0.2,0,0.4,0c0.1,0,0.3,0,0.4,0c0.1,0,0.1,0,0.2,0c0,0,0.2,0,0.2,0S7.7,5.3,7.7,5.4c0,0-0.1,0.1-0.1,0.1 C7.6,5.6,7.5,5.7,7.4,5.8C7.3,5.8,7.2,5.9,7.1,5.9C7,6,6.9,6,6.7,5.9c-0.2,0-0.3,0-0.4-0.1C6,5.8,5.8,5.6,5.6,5.5 C5.2,5.2,5,4.8,5,4.2C5,3.8,5.2,3.3,5.6,3z M6.5,4C6.4,3.9,6.4,3.8,6.4,3.6c0-0.2,0-0.3,0.2-0.4C6.7,3,6.8,3,6.9,3 c0.2,0,0.3,0,0.4,0.2c0.1,0.1,0.2,0.2,0.2,0.4c0,0.2,0,0.3-0.2,0.4C7.2,4.2,7.2,4.2,7,4.2L6.9,4.4h0L6.7,4.2h0.1 C6.7,4.2,6.6,4.1,6.5,4z M7.3,7c0.1,0.1,0.2,0.2,0.2,0.4s0,0.3-0.1,0.4C7.3,8,7.1,8.1,7,8.1c-0.2,0-0.3,0-0.4-0.2 C6.4,7.8,6.4,7.7,6.4,7.5c0-0.2,0-0.3,0.1-0.4c0.1-0.1,0.2-0.2,0.3-0.2L7,6.6l0.1,0.2H7C7.2,6.8,7.2,6.9,7.3,7z M8.5,8 C8.2,8.3,7.6,8.4,7,8.4S5.8,8.3,5.5,8C5.3,7.8,5.1,7.6,5,7.4C4.9,7.3,4.8,6.9,5,6.8c0,0,0.1,0,0.2,0c0.2,0,0.3,0,0.5,0 c0,0.3,0.2,0.6,0.5,0.7c0,0,0,0,0,0c0,0,0,0,0,0c0,0.2,0.1,0.4,0.2,0.5C6.6,8.2,6.8,8.2,7,8.2S7.4,8,7.5,7.9 c0.1-0.1,0.1-0.2,0.1-0.3c0.1,0,0.2,0,0.2-0.1c0.3-0.2,0.4-0.4,0.4-0.7c0-0.3-0.2-0.6-0.4-0.7c0,0-0.1,0-0.2-0.1c0,0-0.1,0-0.1-0.1 c0-0.1,0.1-0.2,0.2-0.2C7.9,5.4,8,5.3,8.2,5.2h0c0,0,0,0.1,0.1,0.1c0.1,0,0.1,0.1,0.2,0.1c0.4,0.3,0.6,0.7,0.6,1.3S8.9,7.7,8.5,8z",
      fillColor: "#00bbff",
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: "#2b5bca",
      scale: 3,
      anchor: new window.google.maps.Point(10, 10),
    };

    setMarker(
      new window.google.maps.Marker({
        animation: window.google.maps.Animation.DROP,
        icon: svgMarker,
        clickable: true,
      })
    );
  }, []);

  useEffect(() => {
    if (marker) {
      marker.setMap(map);
      marker.setPosition(position);
      const infowindow = new window.google.maps.InfoWindow({
        content: `<h3>${supTrips[id].supTripName}</h3>${marker.position} 
          <a href="http://localhost:3000/${supTrips[id].id}">Ver detalles</a>
        `,
      });
      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          shouldFocus: false,
          position: marker.position,
        });
      });
    } // eslint-disable-next-line
  }, [marker]);

  return <div>marker</div>;
}

export default Marker;
