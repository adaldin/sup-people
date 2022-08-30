import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";
import useSupTrips from "../../context/SupTripsContext";
import { getUserName } from "../../services/usersService/index.js";
import PaddleTripsItem from "../paddleTripsItem/PaddleTripsItem.js";
import { Link } from "react-router-dom";
import { getSuptripsByUser } from "../../services/APIService/index.js";
// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function UserProfile() {
  const [userName, setUserName] = useState("");
  const [filteredSupTrips, setFilteredSupTrips] = useState([]);
  const { user, logout, loading } = useAuth();
  const { supTrips } = useSupTrips();

  const navigate = useNavigate();

  useEffect(() => {
    async function displayUserName() {
      const userData = await getUserName(user.uid);
      setUserName(userData);
    }
    displayUserName();
  }, [user.uid]);

  useEffect(() => {
    const userSupTrips = JSON.parse(localStorage.getItem("userSupTrips"));
    if (userSupTrips) {
      setFilteredSupTrips(userSupTrips);
    } else {
      const userSupTrips = getSuptripsByUser(supTrips, user.uid);
      setFilteredSupTrips(userSupTrips);
      localStorage.setItem("userSupTrips", JSON.stringify(userSupTrips));
    }
  }, [supTrips, user.uid]);

  useEffect(() => {
    const userSupTrips = JSON.parse(localStorage.getItem("userSupTrips"));
    if (userSupTrips) {
      setFilteredSupTrips(userSupTrips);
    } else {
      setFilteredSupTrips(supTrips);
    }
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
                {filteredSupTrips.length !== 0 ? (
                  filteredSupTrips.map((paddleTrip, i) => (
                    <Link
                      to={`/${paddleTrip.id}`}
                      className="text-decoration-none text-muted w-100 p-3"
                      key={i}
                    >
                      <PaddleTripsItem {...paddleTrip} />
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
