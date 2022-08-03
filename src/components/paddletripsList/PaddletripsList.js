import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import PaddleTripsItem from "../paddleTripsItem/PaddleTripsItem";
import { getTodaySupTrips } from "../../services/APIService";

function PaddleTripsList() {
  const [supTrips, setSupTrips] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await getTodaySupTrips();
      setSupTrips(response);
      // console.log(response);
    }
    getData();
  }, []);

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
