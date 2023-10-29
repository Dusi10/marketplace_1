import { Button, Container, Nav, NavLink } from "react-bootstrap";
import Slider from "../../components/Slider";
import { auth } from "../../config/firebase";
import "../formating/pictures.css";
import { useEffect, useState } from "react";
import SearchPicture from "./SearchPicture";
import AddUser from "./AddUser";

export function Home() {
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    // Set a timeout to show the Slider component after 2000 milliseconds (2 seconds)
    const timeoutId = setTimeout(() => {
      setShowSlider(true);
    }, 1000);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      <Container className="search mb-5">
        
        <SearchPicture/>
        <Button className="input-submit rounded-circle " variant="outline-primary" type="submit">
          ➜
        </Button>
        <span className="input-submit-search">🔍</span>
      </Container>

      {showSlider && <Slider />}
      <AddUser/>
    </div>
  );
}
