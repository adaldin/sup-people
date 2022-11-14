import "../../global.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.js";
import useSupTrips from "../../context/SupTripsContext";
import { getUserName } from "../../services/usersService/index.js";
import PaddleTripsItem from "../paddleTripsItem/PaddleTripsItem.js";
import { Link } from "react-router-dom";
import {
  updateTrips,
  deleteTrip,
  getSuptripsByAtendees,
  getSuptripsByCreator,
} from "../../services/APIService/index.js";
import AddSuptrip from "../addSuptrip/AddSuptrip.js";
// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function UserProfile() {
  const [userName, setUserName] = useState("");
  const [filteredSupTrips, setFilteredSupTrips] = useState([]);
  const [userTrips, setUserTrips] = useState([]);
  const { user, logout, loading } = useAuth();
  const { supTrips, updateSupTrip, removeSupTrip } = useSupTrips();

  const navigate = useNavigate();

  useEffect(() => {
    async function displayUserName() {
      const userData = await getUserName(user.uid);
      setUserName(userData);
    }
    displayUserName();
  }, [user.uid]);

  useEffect(() => {
    function getNextTrips() {
      if (supTrips === undefined || supTrips.length === 0) {
        const userNextSupTrips = JSON.parse(
          localStorage.getItem("userNextSupTrips")
        );
        const userOwnedSupTrips = JSON.parse(
          localStorage.getItem("userOwnedSupTrips")
        );
        setFilteredSupTrips(userNextSupTrips);
        setUserTrips(userOwnedSupTrips);
      } else {
        const userNextSupTrips = getSuptripsByAtendees(supTrips, user.uid);
        const userOwnedSupTrips = getSuptripsByCreator(supTrips, user.uid);

        setFilteredSupTrips(userNextSupTrips);
        setUserTrips(userOwnedSupTrips);

        localStorage.setItem(
          "userNextSupTrips",
          JSON.stringify(userNextSupTrips)
        );

        localStorage.setItem(
          "userOwnedSupTrips",
          JSON.stringify(userOwnedSupTrips)
        );
      }
    }
    getNextTrips();
  }, [supTrips, user.uid]);

  async function handleLogout() {
    await logout();
    navigate("/profile");
  }

  async function handleNextTripsDelete(e) {
    const supId = e.target.id;
    const currentSuptrip = filteredSupTrips.find(
      (suptrip) => suptrip.id === supId
    );
    currentSuptrip.atendees.splice(
      currentSuptrip.atendees.indexOf(user.uid),
      1
    );

    updateSupTrip(currentSuptrip);
    await updateTrips(currentSuptrip);
  }

  async function handleMyTripDelete(e) {
    const supId = e.target.id;
    const currentSuptrip = userTrips.find((suptrip) => suptrip.id === supId);
    removeSupTrip(currentSuptrip);
    await deleteTrip(currentSuptrip);
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
              <AddSuptrip />
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="mt-4">
              <h6 className="fw-bold p-2">My Trips</h6>
            </Col>
            <Col xs={12}>
              <div className="d-flex flex-column gap-2 p-2">
                {userTrips !== null ? (
                  userTrips.map((paddleTrip, i) => (
                    <PaddleTripsItem
                      key={userTrips[i].id}
                      {...paddleTrip}
                      deleteTrip={handleMyTripDelete}
                    />
                  ))
                ) : (
                  <Link to="/">
                    <p className="text-muted">Join to a new Sup Trip </p>
                  </Link>
                )}
              </div>
            </Col>
            <Col xs={12} className="mt-4">
              <h6 className="fw-bold p-2">Next Joined Trips</h6>
            </Col>
            <Col xs={12}>
              <div className="d-flex flex-column gap-2 p-2">
                {filteredSupTrips !== null ? (
                  filteredSupTrips.map((paddleTrip, i) => (
                    <PaddleTripsItem
                      key={filteredSupTrips[i].id}
                      {...paddleTrip}
                      deleteTrip={handleNextTripsDelete}
                    />
                  ))
                ) : (
                  <Link to="/">
                    <p className="text-muted">Join to a new Sup Trip </p>
                  </Link>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="my-5">
              <h6 className="fw-bold">Favourites Routes</h6>
              <small className="text-muted text-center">Upcoming feature</small>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}
export default UserProfile;
