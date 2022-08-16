import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";
import useSupTrips from "../../context/SupTripsContext";
// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function UserProfile() {
  const [loadingTrips, setLoadingTrips] = useState(true);
  const { user, logout, loading } = useAuth();
  const { upcomingSupTrips } = useSupTrips();
  const navigate = useNavigate();

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
          <Row className="justify-content-center align-items-baseline">
            <Col className="text-start" xs={8}>
              Hi userDisplayName!
            </Col>
            <Col
              as={Button}
              xs={4}
              variant="outline-dark"
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
                {!loadingTrips ? (
                  upcomingSupTrips.map((t, i) => (
                    <div key={i}> aquí event item</div>
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
