import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import PaddleTripsItem from "../paddleTripsItem/PaddleTripsItem";
import DataService from "../../services/DataService";
// import { getAllSupTrips } from "../../services/APIService";

function PaddleTripsList() {
  const [paddleTrip, setPaddleTrip] = useState([]);
  const dataService = DataService;

  useEffect(() => {
    if (paddleTrip) {
      const fetchData = async () => {
        const response = await dataService.getAllData();
        console.log(response);
      };
      fetchData();
    }
  }, []);

  // useEffect(() => {
  //   getAllSupTrips().then((response) => {});
  // }, []);

  // // init DataService (apicall)
  // const dataService = DataService;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await dataService.getAllData();
  //     console.log(response);
  //   };
  //   fetchData();
  // }, [dataService]);

  return (
    <Row>
      <Link to={"/id"} className="text-decoration-none">
        <PaddleTripsItem />
      </Link>
    </Row>
  );
}
export default PaddleTripsList;
