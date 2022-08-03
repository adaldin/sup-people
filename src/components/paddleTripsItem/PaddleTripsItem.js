import Col from "react-bootstrap/Col";
function PaddleTripsItem({ supTripName, supTripDate }) {
  return (
    <>
      <Col>
        <p>{supTripName}</p>
      </Col>
      <Col>
        <p>{supTripDate}</p>
      </Col>
    </>
  );
}

export default PaddleTripsItem;
