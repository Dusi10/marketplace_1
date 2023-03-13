import { Button, Container, Nav, NavLink } from "react-bootstrap";
import { auth } from "../config/firebase";
import "../formating/pictures.css";
import { SearchBar } from "../components/SearchBar";

export function Home() {
  return (
    <>
      <Container className="search mb-4">
        <img
          className="search-picture"
          src="src\pictures\search.png"
          alt="USM Cover Photo"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            minHeight: "300px",
          }}
        />
        <span className="texts">Change Your wardrobe, Find exciting goods.</span>
          <input
            type="input"
            placeholder="🔍 What are you looking for?"
            width={"80%"}
            className="search-field"
          />
          <Button className="input-submit rounded-circle " variant="outline-primary"  type="submit">➜</Button>
          
      </Container>
      <div className="pictures-container">
        <img
          className="picture"
          src="src\pictures\generic book open.jpg"
          alt="Book"
        />
        <img
          className="picture"
          src="src\pictures\generic book open.jpg"
          alt="Book"
        />
        <img
          className="picture"
          src="src\pictures\generic book open.jpg"
          alt="Book"
        />
        <img
          className="picture"
          src="src\pictures\generic book open.jpg"
          alt="Book"
        />
        <img
          className="picture"
          src="src\pictures\generic book open.jpg"
          alt="Book"
        />
        <img
          className="picture"
          src="src\pictures\generic book open.jpg"
          alt="Book"
        />
      </div>
    </>
  );
}
