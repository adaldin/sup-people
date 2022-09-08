import React, { useEffect, useRef, useState } from "react";
import { mapID } from "../../config.js";

function ProfileMap({ center, zoom, children }) {
  const [poliMap, setPoliMap] = useState();
  const ref = useRef();

  useEffect(() => {
    setPoliMap(
      new window.google.maps.Map(ref.current, {
        mapId: mapID,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: true,
        streetViewControlOptions: {
          position: window.google.maps.ControlPosition.LEFT_TOP,
        },
        overviewMapControl: false,
        rotateControl: false,
        zoomControl: false,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_CENTER,
        },
        fullscreenControl: false,
        gestureHandling: "greedy",
      })
    );
  }, []);

  useEffect(() => {
    if (poliMap) {
      poliMap.setCenter(new window.google.maps.LatLng(center.lat, center.lng));
      poliMap.setZoom(zoom);
    }
  }, [poliMap]);

  return (
    <div
      ref={ref}
      style={{ height: "85vh" }}
      id="map"
      //   className="map--size___container"
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { poliMap })
      )}
    </div>
  );
}

export default ProfileMap;
