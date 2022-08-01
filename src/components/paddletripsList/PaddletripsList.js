import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import PaddleTripsItem from "../paddleTripsItem/PaddleTripsItem";
import DataService from "../../services/DataService";
import { useEffect } from "react";
import { async } from "@firebase/util";

function PaddleTripsList() {
  // init DataService (apicall)
  const dataService = DataService;

  useEffect(() => {
    const fetchData = async () => {
      const response = await dataService.getAllData();
      console.log(response);
    };
    fetchData();
  }, [dataService]);

  return (
    <Row>
      <Link to={"/id"} className="text-decoration-none">
        <PaddleTripsItem />
      </Link>
    </Row>
  );
}
export default PaddleTripsList;
