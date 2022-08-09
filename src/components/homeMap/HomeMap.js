import React, { useEffect, useRef, useState } from "react";
import { mapID } from "../../config.js";
function HomeMap({ center, zoom, children }) {
  const [map, setMap] = useState();
  const ref = useRef();

  useEffect(() => {
    setMap(
      new window.google.maps.Map(ref.current, {
        mapId: mapID,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: true,
        streetViewControlOptions: {
          position: window.google.maps.ControlPosition.LEFT_TOP,
        },
        overviewMapControl: false,
        rotateControl: false,
        panControl: false,
        zoomControl: true,
        fullscreenControl: false,
      })
    );
  }, []);

  if (map) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let initialLocation = new window.google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        map.setCenter(initialLocation);
        map.setZoom(13);
      },
      function (positionError) {
        map.setCenter(new window.google.maps.LatLng(41.390205, 2.154007));
        map.setZoom(10);
      }
    );
  }

  return (
    <div ref={ref} style={{ height: "90vh" }} id="map">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { map })
      )}
    </div>
  );
}

export default HomeMap;
