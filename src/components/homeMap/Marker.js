import { useEffect, useState } from "react";
import useSupTrips from "../../context/SupTripsContext";

function Marker({ position, map, id }) {
  const [marker, setMarker] = useState();
  // custom hook to use context
  const { upcomingSupTrips } = useSupTrips();

  useEffect(() => {
    const svgMarker = {
      path: "M7,0c2.2,0,4.1,1.5,4.5,3.7c0.1,0.3,0.1,0.6,0.1,0.9c0,0.7-0.2,1.3-0.4,1.9c-0.4,1-0.9,2-1.4,3 c-0.8,1.5-1.7,3-2.7,4.4C7,14,7,14,6.9,13.9c-1.2-1.7-2.3-3.5-3.2-5.4C3.3,7.8,3,7,2.7,6.2C2.6,5.7,2.5,5.3,2.5,4.9 c0-0.7,0-1.3,0.3-2c0.6-1.5,1.8-2.5,3.4-2.8C6.5,0,6.7,0,7,0z",
      fillColor: "#2C9BB3",
      fillOpacity: 1,
      strokeWeight: 3,
      strokeColor: "#fff",
      scale: 3,
      labelOrigin: new window.google.maps.Point(7, 6),
      anchor: new window.google.maps.Point(10, 10),
    };

    setMarker(
      new window.google.maps.Marker({
        animation: window.google.maps.Animation.DROP,
        icon: svgMarker,
        clickable: true,
        label: {
          text: "S",
          color: "white",
          fontWeight: "bold",
          fontSize: "19px",
        },
      })
    );
  }, []);

  useEffect(() => {
    if (marker) {
      marker.setMap(map);
      marker.setPosition(position);
      const infowindow = new window.google.maps.InfoWindow({
        content: `<h4>${upcomingSupTrips[id].supTripName}</h4>
        <small><i class="bi bi-calendar-check"></i> ${upcomingSupTrips[id].supTripDate} - <i class="bi bi-clock-history"></i> ${upcomingSupTrips[id].supTripHour}hs</small><br>
 <a href="https://sup-people.vercel.app/${upcomingSupTrips[id].id}" style="text-decoration:none;#2C9BB3:">Conoce los detalles</a>
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
