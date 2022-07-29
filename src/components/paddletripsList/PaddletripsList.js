import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import PaddleTripsItem from "../paddleTripsItem/PaddleTripsItem";

function PaddleTripsList() {
  return (
    <Row>
      <Link to={"/id"} className="text-decoration-none">
        <PaddleTripsItem />
      </Link>
    </Row>
  );
}
export default PaddleTripsList;
