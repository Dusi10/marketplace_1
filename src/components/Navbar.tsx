import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../formating/format.css"

export function Navbar() {
  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/User" as={NavLink}>
            User
          </Nav.Link>
          <Nav.Link to="/Help" as={NavLink}>
            Help
          </Nav.Link>

        </Nav>
        <button className="lbutton">
          Login
        </button>
      </Container>
    </NavbarBs>
  );
}
