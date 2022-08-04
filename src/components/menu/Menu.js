// React
import { Link } from "react-router-dom";
// Bootstrap
import Nav from "react-bootstrap/Nav";
import "./menu.css";

function Menu() {
  return (
    <Nav
      fill
      variant="tabs"
      defaultActiveKey="/"
      className="menu--container fixed-bottom bg-light"
    >
      <Nav.Item className="menu--item ">
        <Nav.Link
          as={Link}
          to="/"
          className="menu--link d-flex flex-column text-dark"
        >
          <i className="bi bi-water text-primary"></i>
          <small className="m-0">Today</small>
        </Nav.Link>
      </Nav.Item>
      <div className="vr"></div>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/explore"
          eventKey="explore"
          className="menu--link d-flex flex-column text-dark"
        >
          <i className="bi bi-search text-primary"></i>
          <small className="m-0">Explore</small>
        </Nav.Link>
      </Nav.Item>
      <div className="vr"></div>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/profile"
          eventKey="profile"
          className="menu--link d-flex flex-column text-dark menu--link"
        >
          <i className="bi bi-person-circle text-primary"></i>
          <small className="m-0">Profile</small>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Menu;
