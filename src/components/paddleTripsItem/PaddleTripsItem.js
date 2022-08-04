import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import "../../global.css";

function PaddleTripsItem({
  supTripName,
  supTripDate,
  atendees,
  supTripHour,
  supTripLocality,
}) {
  return (
    <Card className=" borders p-2 bg-transparent">
      <Card.Body>
        <Col className="d-flex align-items-baseline gap-2 mb-0" xs={12}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#2C9BB3"
            className="bi bi-geo-alt-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
          </svg>

          <p className="font-heading mb-0">{supTripLocality}</p>
        </Col>

        <Card.Title>
          <h3 className="display-5 font-title">{supTripName}</h3>
        </Card.Title>

        <Col className="d-flex align-items-baseline gap-2 mb-0" xs={12}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="#2C9BB3"
            clasName="bi bi-calendar"
            viewBox="0 0 16 16"
          >
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
          </svg>
          <p className="font-subHeading mb-0">{supTripDate}</p>
        </Col>
        <Card.Text className="d-flex">
          <div className="d-flex  justify-content-start flex-column">
            <small className="fw-bold">Atendees</small>
            <div className="d-flex">
              <div>
                <Badge pill className="primary-bg-color text-white">
                  {atendees !== undefined
                    ? atendees.map((_atendee, i) => i + 1)
                    : ""}
                </Badge>
              </div>
              <p className="fw-light">
                {atendees !== undefined
                  ? atendees.map((atendee) => atendee)
                  : ""}
              </p>
            </div>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PaddleTripsItem;
