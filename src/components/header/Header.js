// React
import { Link } from "react-router-dom";
// Bootstrap
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import logo from "../../assets/board-white.svg";
import blueLogo from "../../assets/board-blue.svg";
import "../../global.css";

function Header() {
  let expand = "md";
  return (
    <Navbar expand="md" className="mb-0 primary-bg-color shadow-sm p-0">
      <Container fluid>
        <Navbar.Brand
          href="http://localhost:3000/"
          className="d-flex justify-content-center align-items-end gap-2"
        >
          <div style={{ width: "20px" }}>
            <img src={logo} alt="sup-people-logo" className="img-fluid" />
          </div>
          <h5 className="fw-bold white-front-color-header"> sup people</h5>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls={`offcanvasNavbar-expand-${expand}`}
          className="border border-0"
        />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              id={`offcanvasNavbarLabel-expand-${expand}`}
              className="font-title d-flex align-items-center gap-2"
            >
              <div style={{ width: "20px" }}>
                <img
                  src={blueLogo}
                  alt="sup-people-logo"
                  className="img-fluid"
                />
              </div>
              sup people
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={Link} to="/" className="font-subHeading">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/explore" className="font-subHeading">
                Explore
              </Nav.Link>
              <Nav.Link as={Link} to="/profile" className="font-subHeading">
                Profile
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
export default Header;
