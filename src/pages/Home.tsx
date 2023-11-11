import { Button, Container, Nav, NavLink } from "react-bootstrap";
import Slider from "../components/Slider";
import "../formating/pictures.css";
import SearchHome from "./HomePage/SearchHome";
import AddUser from "./HomePage/AddUser";


export function Home() {
const text1 = "Cseréld le a ruhatárad, találj igazlmas ruhadarabokat."

  return (
    <div className="listingBackground">
      <SearchHome/>
      <Slider/>
    </div>
  );
}