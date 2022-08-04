import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import PaddleTripsItem from "../paddleTripsItem/PaddleTripsItem";
import { getSupTrips } from "../../services/APIService";
import useSupTrips from "../../context/SupTripsContext";
import Splash from "../splash/Splash";

function PaddleTripsList() {
  const [supTripsFirestore, setSupTripsFirestore] = useState([]);
  const [loadingSupTrips, setLoadingSupTrips] = useState(true);
  const [todaySupTrips, setTodaySupTrips] = useState([]);
  // custom hook use context
  const { supTrips, initSupTrips } = useSupTrips();

  useEffect(() => {
    async function getData() {
      const response = await getSupTrips();
      setSupTripsFirestore(response);
      setLoadingSupTrips(false);
    }
    getData();
  }, []);

  useEffect(() => {
    async function initContext() {
      if (supTrips.length === 0) {
        let init = await initSupTrips(supTripsFirestore);
      }
    }
    initContext();
  }, [supTripsFirestore]);
  useEffect(() => {
    function filterByToday() {
      let dateToday = new Date()
        .toLocaleString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .split(",")[0];

      let todayTrips = supTrips.filter(
        (trip) => trip.supTripDate === dateToday
      );
      setTodaySupTrips(todayTrips);
    }
    filterByToday();
  }, [supTrips]);

  return (
    <Row className="gap-3 p-3">
      {loadingSupTrips ? (
        <Splash />
      ) : (
        todaySupTrips.map((item, index) => (
          <Link
            to={`${item.id}`}
            className="text-decoration-none text-muted"
            key={index}
          >
            <PaddleTripsItem {...item} />
          </Link>
        ))
      )}
    </Row>
  );
}
export default PaddleTripsList;
