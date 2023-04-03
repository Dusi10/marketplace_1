import { Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../formating/format.css";
import "../formating/user.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

//Second row navbar for more pages
export const FastNavbar = () => {
  const [user] = useAuthState(auth);
  return (
    <NavbarBs  className="bg-white shadow-sm mb-4">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/clothes" as={NavLink}>
            Clothes
          </Nav.Link>
          <Nav.Link to="/books" as={NavLink}>
            Books
          </Nav.Link>
          <Nav.Link to="/rent" as={NavLink}>
            Rent
          </Nav.Link>
        </Nav>
        {user ? (
          <div className="user-info">
            <span>
              <Nav.Link to="/Sellitem" as={NavLink}>
                Sell Items
              </Nav.Link>
            </span>
          </div>
        ) : (
          ""
        )}
      </Container>
    </NavbarBs>
  );
};
