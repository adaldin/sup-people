// React
import { Link } from "react-router-dom";
// Bootstrap
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import logo from "../../assets/board-yellow.svg";
import "../../global.css";

function Header() {
  let expand = "lg";
  return (
    <Navbar expand="lg" className="mb-3 bg-gradient-primary shadow-sm">
      <Container fluid>
        <Navbar.Brand
          href="#"
          className="d-flex justify-content-center align-items-end gap-2"
        >
          <div style={{ width: "20px" }}>
            <img src={logo} alt="sup-people-logo" className="img-fluid" />
          </div>
          <h5 className="fw-bold font-title-secondary"> sup people</h5>
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
              className="font-title"
            >
              Sun Sup People
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={Link} to="/">
                Today
              </Nav.Link>
              <Nav.Link as={Link} to="/explore">
                Explore
              </Nav.Link>
              <Nav.Link as={Link} to="/profile">
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
