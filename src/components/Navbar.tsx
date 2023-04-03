import { Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../formating/format.css";
import { Login } from "../components/login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

//Top navbar
export const Navbar = () => {
  const [user] = useAuthState(auth);
  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-2">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/Help" as={NavLink}>
            Help
          </Nav.Link>
          {user? (          <Nav.Link to="/User" as={NavLink}>
            User
          </Nav.Link>):("")}
          {user? (          <Nav.Link to="/Listings" as={NavLink}>
            Listings
          </Nav.Link>):("")}

        </Nav>
        <Login />
      </Container>
    </NavbarBs>
  );
};
