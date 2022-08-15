import { useEffect } from "react";
import { windyMapsKey } from "../../config.js";
import "./windyWrapper.css";

function WindyWrapper({ coordinates, supTrip, id }) {
  useEffect(() => {
    const options = {
      // Required: API key
      key: windyMapsKey,
      lat: coordinates.lat,
      lon: coordinates.lng,
      zoom: 12,
      timestamp: Date.now() + 3 * 24 * 60 * 60 * 1000,
      hourFormat: "12h",
    };
    window.windyInit(options, (windyAPI) => {
      const { map } = windyAPI;
      window.L.popup()
        .setLatLng([coordinates.lat, coordinates.lng])
        .setContent(
          `<small><strong>${supTrip.supTripName} entry waypoint</strong></small>`
        )
        .openOn(map);
    });
  }, []);

  // <small>${supTrip.supTripName} entry point</small>

  return <div id="windy" style={{ width: "100%", height: "50vh" }}></div>;
}
export default WindyWrapper;
