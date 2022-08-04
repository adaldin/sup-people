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
          className="menu--link d-flex flex-column justify-content-center align-items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#2C9BB3"
            className="bi bi-house"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
            />
            <path
              fill-rule="evenodd"
              d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
            />
          </svg>
          <p className="m-0 font-primary-small">Today</p>
        </Nav.Link>
      </Nav.Item>
      <div className="vr primary-front-color"></div>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/explore"
          eventKey="explore"
          className="menu--link d-flex flex-column justify-content-center align-items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#2C9BB3"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
          <p className="m-0 font-primary-small">Explore</p>
        </Nav.Link>
      </Nav.Item>
      <div className="vr primary-front-color"></div>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/profile"
          eventKey="profile"
          className="menu--link d-flex flex-column justify-content-center align-items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#2C9BB3"
            className="bi bi-person"
            viewBox="0 0 16 16"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
          </svg>
          <p className="m-0 font-primary-small">Profile</p>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Menu;
