import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import PaddleTripsItem from "../paddleTripsItem/PaddleTripsItem";
import { getSupTrips } from "../../services/APIService";
import useSupTrips from "../../context/SupTripsContext";

function PaddleTripsList() {
  const [supTripsFirestore, setSupTripsFirestore] = useState([]);
  const { supTrips, initSupTrips, addSupTrip, removeSupTrip, updateSupTrip } =
    useSupTrips();
  const [isInSupTrips, setIsInSupTrips] = useState(false);

  useEffect(() => {
    async function getData() {
      const response = await getSupTrips();
      setSupTripsFirestore(response);
    }
    getData();
  }, []);

  useEffect(() => {
    function avoidDuplicated() {
      supTripsFirestore.map((supTrip) => {
        let contextData = supTrips.find((element) => element.id === supTrip.id);
        if (supTrip.id === contextData) {
          setIsInSupTrips(true);
          removeSupTrip(supTrip);
        } else {
          setIsInSupTrips(false);
          console.log("no existe en contexto aun");
          initSupTrips(supTripsFirestore);
        }
        return supTrip;
      });
    }

    avoidDuplicated();
  }, [supTripsFirestore]);

  // Filter with today date:
  // let dateToday = new Date()
  // .toLocaleString("en-GB", {
  //   year: "numeric",
  //   month: "2-digit",
  //   day: "2-digit",
  // })
  // .split(",")[0];

  return (
    <Row>
      {supTrips.map((item, index) => (
        <Link
          to={`${item.id}`}
          className="text-decoration-none text-muted"
          key={index}
        >
          <PaddleTripsItem {...item} />
        </Link>
      ))}
    </Row>
  );
}
export default PaddleTripsList;
