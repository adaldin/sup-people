import { useEffect, useState } from "react";

function Polyline({ poliMap }) {
  const [poly, setPoly] = useState();
  useEffect(() => {
    setPoly(
      new window.google.maps.Polyline({
        strokeColor: "#2C9BB3",
        strokeOpacity: 1.0,
        strokeWeight: 3,
      })
    );
  }, []);
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

    if (poly) {
      poly.setMap(poliMap);

      poliMap.addListener("click", (e) => {
        let path = poly.getPath();
        path.push(e.latLng);

        new window.google.maps.Marker({
          position: e.latLng,
          title: "#" + path.getLength(),
          map: poliMap,
          animation: window.google.maps.Animation.DROP,
          icon: svgMarker,
          clickable: true,
          label: {
            text: "S",
            color: "white",
            fontWeight: "bold",
            fontSize: "19px",
          },
        });
      });
    }
  }, [poly]);

  return <div>Polyline</div>;
}
export default Polyline;
