import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import PaddleTripsItem from "../paddleTripsItem/PaddleTripsItem";
import { getSupTrips } from "../../services/APIService";

function PaddleTripsList() {
  const [supTrips, setSupTrips] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await getSupTrips();
      setSupTrips(response);
      // console.log(response);
    }
    getData();
  }, []);
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
