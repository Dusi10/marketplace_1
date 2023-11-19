import { Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Login } from "../login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { navLinkStyle } from "./FastNavbar";

//Top navbar
export const Navbar = () => {
  const [user] = useAuthState(auth);
  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-2">
      <Container>
        <Nav className="me-auto">
          <NavLink style={navLinkStyle} className={"reverseLined"} to="/">
            Kezdőlap
          </NavLink>
          {/* <NavLink style={navLinkStyle} className={"reverseLined"} to="/Help">
                        Segítség
                    </NavLink> */}
          {user && (
            <NavLink
              style={navLinkStyle}
              className={"reverseLined"}
              to="/ChatPage"
            >
              Beszélgetések
            </NavLink>
          )}
          {user && (
            <NavLink
              style={navLinkStyle}
              className={"reverseLined"}
              to="/Listings"
            >
              Hirdetéseim
            </NavLink>
          )}
          {user && (
            <NavLink
              style={navLinkStyle}
              className={"reverseLined"}
              to={`/SellerProfile/${user?.uid}`}
            >
              Profil
            </NavLink>
          )}
        </Nav>
        <Login />
      </Container>
    </NavbarBs>
  );
};
