import { Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../formating/format.css";
import "../formating/user.css";
import { Cart } from "./Cart";

export const FastNavbar = () => {
  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
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
        <div className="user-info">
          <span>
            <Nav.Link to="/User" as={NavLink}>
              Sell Items
            </Nav.Link>
          </span>
          <Cart />
        </div>
      </Container>
    </NavbarBs>
  );
};
