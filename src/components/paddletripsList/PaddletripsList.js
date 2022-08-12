import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import PaddleTripsItem from "../paddleTripsItem/PaddleTripsItem";
import { getSupTrips } from "../../services/APIService";
import useSupTrips from "../../context/SupTripsContext";
import Splash from "../splash/Splash";
import Button from "react-bootstrap/Button";
import HomeMapWrapper from "../homeMap/HomeMapWrapper";

function PaddleTripsList() {
  const [supTripsFirestore, setSupTripsFirestore] = useState([]);
  const [loadingSupTrips, setLoadingSupTrips] = useState(true);
  const [openMap, setOpenMap] = useState(false);
  // custom hook to use context
  const { supTrips, initSupTrips, upcomingSupTrips } = useSupTrips();

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
    initContext();
  }, [supTripsFirestore]);

  function handleMapList() {
    setOpenMap((prevOpen) => !prevOpen);
  }

  return (
    <Row className="gap-3 p-0 mb-5">
      {loadingSupTrips ? (
        <Splash />
      ) : openMap ? (
        <HomeMapWrapper />
      ) : (
        upcomingSupTrips.map((item, index) => (
          <Link
            to={`${item.id}`}
            className="text-decoration-none text-muted w-100 p-3"
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
          <Button
            onClick={handleMapList}
            className="btn--primary shadow rounded-pill"
          >
            {openMap ? (
              <div className="p-1">
                <small className="font-body ">Lista</small>
              </div>
            ) : (
              <div className="p-1">
                <small className="font-body">Mapa</small>
              </div>
            )}
          </Button>
        </div>
      )}
    </Row>
  );
}
export default PaddleTripsList;
