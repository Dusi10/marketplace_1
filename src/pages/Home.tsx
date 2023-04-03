import { Button, Container, Nav, NavLink } from "react-bootstrap";
import Slider from "../components/Slider";
import { auth } from "../config/firebase";
import "../formating/pictures.css";

export function Home() {
  return (
    <>
      <Container className="search mb-5 bg-white">
        <img
          className="search-picture"
          src="src\pictures\usm-cover-photo.jpg"
          alt="USM Cover Photo"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            maxHeight: "370px"
          }}
        />
        <span className="texts">Change Your wardrobe, Find exciting goods.</span>
          <input
            type="input"
            placeholder="What are you looking for?"
            width={"80%"}
            className="search-field"
          />
          <Button className="input-submit rounded-circle " variant="outline-primary"  type="submit">➜</Button>
          <span className="input-submit-search">🔍</span>
          
      </Container>
      <Slider/>
    </>
  );
}