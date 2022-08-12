import { useEffect, useState } from "react";

function InfoWindow({ position, map }) {
  const [infoWindow, setInfoWindow] = useState();

  useEffect(() => {
    setInfoWindow(
      new window.google.maps.InfoWindow({
        animation: window.google.maps.Animation.DROP,
      })
    );
  }, []);

  if (infoWindow) {
    infoWindow.setMap(map);
    infoWindow.setPosition(position);
  }

  return <div> info</div>;
}

export default InfoWindow;
