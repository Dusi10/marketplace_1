import { Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import {reverseEasing} from "framer-motion";


export const navLinkStyle = {
  textDecoration: "none", // Remove default underline
};
//Second row navbar for more pages
export const FastNavbar = () => {
  const [user] = useAuthState(auth);
  return (
    <NavbarBs  className="bg-white shadow-sm mb-4">
      <Container>
        <Nav className="me-auto">
        <NavLink className={"reverseLined"} style={navLinkStyle} to="/all" >
            Minden
          </NavLink>
          <NavLink className={"reverseLined"} style={navLinkStyle} to="/clothes" >
            Ruházat
          </NavLink>
          <NavLink className={"reverseLined"} style={navLinkStyle} to="/Food" >
            Ételek
          </NavLink>
          <NavLink className={"reverseLined"} style={navLinkStyle} to="/items">
            Tárgyak
          </NavLink>
          <NavLink className={"reverseLined"} style={navLinkStyle} to="/rent">
            Könyvek
          </NavLink>
          {user && (<NavLink style={navLinkStyle} className={"reverseLined"} to="/Listings">
                        Hirdetéseim
                    </NavLink>)}
          {user &&           <NavLink className={"reverseLined"} to={"/Favourites"}>
            Kedvencek
          </NavLink>}

        </Nav>
        {user && (
          <div className="user-info">
            <span>
              <NavLink className={"hover-3"} style={navLinkStyle} to="/Sellitem" >
                Hirdetés létrehozása
              </NavLink>
            </span>
          </div>

        )}
      </Container>
    </NavbarBs>
  );
};
