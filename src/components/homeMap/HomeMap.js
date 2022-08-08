import React, { useEffect, useRef, useState } from "react";
import { mapID } from "../../config.js";
function HomeMap({ center, zoom, children }) {
  const [map, setMap] = useState();
  const ref = useRef();

  useEffect(() => {
    setMap(new window.google.maps.Map(ref.current, { mapId: mapID }));
  }, []);

  if (map) {
    map.setCenter(center);
    map.setZoom(zoom);
  }

  return (
    <div ref={ref} style={{ height: "80vh" }} id="map">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { map })
      )}
    </div>
  );
}

export default HomeMap;
