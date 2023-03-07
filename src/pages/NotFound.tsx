import { NavLink } from "react-router-dom";
import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";

export function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: "80vh",
      }}
    >
      <span className="h1">404</span>
      <span>Page Not Found</span>
      <button className="lbutton">
        <Nav.Link to="/" as={NavLink}>
          Home
        </Nav.Link>
      </button>
    </div>
  );
}
