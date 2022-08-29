import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";
import useSupTrips from "../../context/SupTripsContext";
import { getUserName } from "../../services/usersService/index.js";
import PaddleTripsItem from "../paddleTripsItem/PaddleTripsItem.js";
import { Link } from "react-router-dom";
// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function UserProfile() {
  const [userName, setUserName] = useState("");
  const { user, logout, loading } = useAuth();
  const { upcomingSupTrips } = useSupTrips();
  const [userPaddleTrips, setUserPaddleTrips] = useState(
    JSON.parse(localStorage.getItem("userPaddleTrips")) || []
  );
  const navigate = useNavigate();

  useEffect(() => {
    async function displayUserName() {
      const userData = await getUserName(user.uid);
      setUserName(userData);
    }
    displayUserName();
  }, []);

  useEffect(() => {
    function saveUpcomingTrips() {
      console.log(upcomingSupTrips);
      if (upcomingSupTrips) {
        setUserPaddleTrips(upcomingSupTrips);
        localStorage.setItem(
          "userPaddleTrips",
          JSON.stringify(upcomingSupTrips)
        );
      }
    }
    saveUpcomingTrips();
  }, []);

  async function handleLogout() {
    await logout();
    navigate("/profile");
  }

  return (
    <div style={{ heigth: "100vh" }}>
      {loading ? (
        <p>Loading</p>
      ) : (
        <Container fluid>
          <Row className="justify-content-center align-items-baseline p-2">
            <Col className="text-end" xs={9}>
              {userName && `Hi ${userName}!`}
            </Col>
            <Col
              as={Button}
              xs={3}
              className="border-1 bg-transparent text-primary"
              onClick={handleLogout}
            >
              Logout
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} className="jusify-content-center">
              aquí form create event
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="mt-4">
              <h6 className="fw-bold p-2">My Routes</h6>
            </Col>
            <Col xs={12}>
              <div className="d-flex flex-column gap-2 p-2">
                {upcomingSupTrips.length !== 0 ? (
                  upcomingSupTrips.map((paddleTrip, i) => (
                    <Link
                      to={`/${paddleTrip.id}`}
                      className="text-decoration-none text-muted w-100 p-3"
                      key={i}
                    >
                      <PaddleTripsItem {...paddleTrip} user={user.uid} />
                    </Link>
                  ))
                ) : (
                  <p className="text-muted">Add a new Route</p>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="my-4">
              <h6 className="fw-bold">Favourites Routes</h6>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
export default UserProfile;
