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
        zoomControl: false,
        fullscreenControl: false,
      })
    );
  }, []);

  if (map) {
    map.setCenter(center);
    map.setZoom(zoom);
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
