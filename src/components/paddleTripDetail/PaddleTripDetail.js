import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserName } from "../../services/usersService";
import useSupTrips from "../../context/SupTripsContext";
import Weather from "../weather/Weather";
import Loader from "../homeMap/loader/Loader";
import WindyWrapper from "../detailMap/WindyWrapper";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

function PaddleTripDetail() {
  const { id } = useParams();
  const { upcomingSupTrips } = useSupTrips();
  const [singleSupTrip, setSingleSupTrip] = useState({});
  const [atendeesNames, setAtendeesNames] = useState([]);
  const [loadingSingleTrip, setLoadingSingleTrip] = useState(true);

  useEffect(() => {
    function getSingleSupTrip() {
      let upcomingTripsLocal = [];

      if (upcomingSupTrips.length !== 0) {
        upcomingTripsLocal = [...upcomingSupTrips];
        localStorage.setItem(
          "upcomingSupTrips",
          JSON.stringify(upcomingSupTrips)
        );
      } else {
        upcomingTripsLocal = JSON.parse(
          localStorage.getItem("upcomingSupTrips")
        );
      }
      const supTrip = upcomingTripsLocal.find((e) => e.id === id);
      setSingleSupTrip(supTrip);
      setLoadingSingleTrip(false);
    }
    getSingleSupTrip(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    async function getAtendeesNames() {
      let names = [];
      if (singleSupTrip.atendees !== undefined) {
        try {
          singleSupTrip.atendees.map(async (atendeeUID) => {
            const data = await getUserName(atendeeUID);
            const name = await data;
            names.push(name);
            setAtendeesNames(names);
            return name;
          });
        } catch (err) {
          console.error(err);
        }
      }
    }
    getAtendeesNames();
  }, [singleSupTrip]);

  return (
    <Container className="mb-5">
      {loadingSingleTrip ? (
        <Loader />
      ) : (
        <Row>
          <Col xs={12} className="bg-info bg-gradient">
            <div className="text-secondary d-flex align-items-baseline justify-content-between gap-2 ">
              <Weather coordinates={singleSupTrip.coordinates.entryPoint} />
            </div>
          </Col>
          <Col xs={12} className="mt-1 p-2">
            <h3 className="font-title mb-0 p-2">{singleSupTrip.supTripName}</h3>
          </Col>
          <Col
            xs={12}
            lg={6}
            className="d-flex p-2 gap-1 justify-content-between"
          >
            <Col className="d-grid">
              <Button
                className="btn-sm rounded-pill shadow-sm fw-bold"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #1D859B",
                  color: "#2C9BB3",
                }}
                // onClick={handleFeature}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-hand-thumbs-up"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                </svg>{" "}
                Like
              </Button>
            </Col>
            <Col className="d-grid">
              <Button
                className="btn-sm rounded-pill shadow-sm fw-bold"
                style={{
                  backgroundColor: "transparent",
                  color: "#2C9BB3",
                  border: "1px solid #1D859B",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-download"
                  viewBox="0 0 16 16"
                >
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                </svg>{" "}
                Save
              </Button>
            </Col>
            <Col className="d-grid">
              <Button
                className="btn-sm rounded-pill shadow-sm fw-bold"
                style={{
                  backgroundColor: "transparent",
                  color: "#2C9BB3",
                  border: "1px solid #1D859B",
                }}
                // onClick={handleFeature}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-share"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                </svg>{" "}
                Share
              </Button>
            </Col>
          </Col>
          <Col xs={12} lg={2}>
            <small>Valoraciones: {singleSupTrip.supTripRate}</small>
          </Col>
          <Col xs={12} className=" my-1 p-0 col-12 opacity-100">
            <WindyWrapper
              coordinates={singleSupTrip.coordinates.entryPoint}
              supTrip={singleSupTrip}
              id={id}
            />
          </Col>
          <Col
            xs={12}
            className="d-flex flex-column justify-content-start align-content-baseline gap-1 p-2"
          >
            <p className="my-0 fw-bold">People on this trip</p>
            <div className="d-flex gap-2 bg-white p-2 rounded shadow-sm">
              <div>
                <Badge pill bg="info">
                  {singleSupTrip.atendees.length}
                </Badge>
              </div>
              <p className="fw-light text-wrap text-break">
                {atendeesNames.length !== 0
                  ? atendeesNames.map((atendeeName, i, atendeesNames) =>
                      i === atendeesNames.length - 1
                        ? `${atendeeName}. `
                        : `${atendeeName}, `
                    )
                  : ""}
              </p>
            </div>
          </Col>
          <Col xs={12} className="p-2">
            <p className="my-0 fw-bold">Description</p>
            <div className=" bg-white p-2 rounded shadow-sm">
              {singleSupTrip.supTripDescription}
            </div>
          </Col>

          <Col xs={12} className="p-2">
            <p className="my-0 fw-bold">Paddleboard props</p>
            <div className=" bg-white p-2 rounded shadow-sm">
              {Object.keys(singleSupTrip.board).map((field, i) => (
                <div className="d-flex align-items-baseline" key={i}>
                  <div className=" d-flex p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#2C9BB3"
                      className="bi bi-backspace-reverse"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.854 5.146a.5.5 0 0 1 0 .708L7.707 8l2.147 2.146a.5.5 0 0 1-.708.708L7 8.707l-2.146 2.147a.5.5 0 0 1-.708-.708L6.293 8 4.146 5.854a.5.5 0 1 1 .708-.708L7 7.293l2.146-2.147a.5.5 0 0 1 .708 0z" />
                      <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7.08a2 2 0 0 0 1.519-.698l4.843-5.651a1 1 0 0 0 0-1.302L10.6 1.7A2 2 0 0 0 9.08 1H2zm7.08 1a1 1 0 0 1 .76.35L14.682 8l-4.844 5.65a1 1 0 0 1-.759.35H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h7.08z" />
                    </svg>
                  </div>
                  <div className="d-flex flex-column primary-front-color">
                    <p className="fw-bold p-0 mb-0 text-capitalize">
                      {field === "bestFor" ? "Best For" : field}
                    </p>
                    <small className="p-0">{singleSupTrip.board[field]}</small>
                  </div>
                </div>
              ))}
            </div>
          </Col>

          <Col xs={12} className="mb-3">
            {/* si creó él el trip button disabled, sino JOIN to this trip */}
            <div className="d-flex justify-content-center align-items-center p-2 ">
              <Button
                className="rounded-pill fw-bold shadow w-100"
                style={{
                  backgroundImage:
                    "radial-gradient( circle farthest-corner at 22.4% 21.7%, rgba(4,189,228,1) 0%, rgba(2,83,185,1) 100.2% )",
                  border: "1px solid #1D859B",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-emoji-sunglasses"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.968 9.75a.5.5 0 1 0-.866.5A4.498 4.498 0 0 0 8 12.5a4.5 4.5 0 0 0 3.898-2.25.5.5 0 1 0-.866-.5A3.498 3.498 0 0 1 8 11.5a3.498 3.498 0 0 1-3.032-1.75zM7 5.116V5a1 1 0 0 0-1-1H3.28a1 1 0 0 0-.97 1.243l.311 1.242A2 2 0 0 0 4.561 8H5a2 2 0 0 0 1.994-1.839A2.99 2.99 0 0 1 8 6c.393 0 .74.064 1.006.161A2 2 0 0 0 11 8h.438a2 2 0 0 0 1.94-1.515l.311-1.242A1 1 0 0 0 12.72 4H10a1 1 0 0 0-1 1v.116A4.22 4.22 0 0 0 8 5c-.35 0-.69.04-1 .116z" />
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-1 0A7 7 0 1 0 1 8a7 7 0 0 0 14 0z" />
                </svg>{" "}
                Join to this trip
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}
export default PaddleTripDetail;
