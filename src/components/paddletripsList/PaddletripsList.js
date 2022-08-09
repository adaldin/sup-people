import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import PaddleTripsItem from "../paddleTripsItem/PaddleTripsItem";
import { getSupTrips } from "../../services/APIService";
import { getAllTripsEntryPoints } from "../../services/mapsService";
import useSupTrips from "../../context/SupTripsContext";
import Splash from "../splash/Splash";
import Button from "react-bootstrap/Button";
import HomeMapWrapper from "../homeMap/HomeMapWrapper";

function PaddleTripsList() {
  const [supTripsFirestore, setSupTripsFirestore] = useState([]);
  const [loadingSupTrips, setLoadingSupTrips] = useState(true);
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [openMap, setOpenMap] = useState(false);
  // custom hook to use context
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
        await initSupTrips(supTripsFirestore);
      }
    }
    initContext(); // eslint-disable-next-line
  }, [supTripsFirestore]);

  useEffect(() => {
    function filterFromToday() {
      let dateToday = new Date()
        .toLocaleString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .split(",")[0];

      let fromTodayTrips = supTrips.filter(
        (trip) => trip.supTripDate >= dateToday
      );

      const sortedSupTrips = fromTodayTrips.sort((a, b) => {
        const newA = a.supTripDate.split("/").reverse().join("-");
        const newB = b.supTripDate.split("/").reverse().join("-");
        return +new Date(newA) - +new Date(newB);
      });

      setUpcomingTrips(sortedSupTrips);
    }
    filterFromToday();
  }, [supTrips]);

  function handleMapList() {
    setOpenMap((prevOpen) => !prevOpen);
  }

  return (
    <Row className="gap-3 p-3 mb-5">
      {loadingSupTrips ? (
        <Splash />
      ) : openMap ? (
        <HomeMapWrapper />
      ) : (
        upcomingTrips.map((item, index) => (
          <Link
            to={`${item.id}`}
            className="text-decoration-none text-muted w-100"
            key={index}
          >
            <PaddleTripsItem {...item} />
          </Link>
        ))
      )}
      {loadingSupTrips ? (
        ""
      ) : (
        <div className="d-flex fixed-bottom translate-middle-y mb-5 justify-content-center">
          <Button onClick={handleMapList} className="btn--primary shadow-sm">
            {openMap ? (
              <div className="p-1">
                <small className="font-body ">List</small>
              </div>
            ) : (
              <div className="p-1">
                <small className="font-body">Map</small>
              </div>
            )}
          </Button>
        </div>
      )}
    </Row>
  );
}
export default PaddleTripsList;
