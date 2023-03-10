import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Help } from "./pages/Help";
import { User } from "./pages/User";
import { Navbar } from "./components/Navbar";
import { NotFound } from "./pages/NotFound";
import { FastNavbar } from "./components/FastNavbar";
import { Clothes } from "./pages/Clothes";
import { Books } from "./pages/Books";
import { Rent } from "./pages/Rent";

function App() {
  return (
    <>
      <Navbar />
      <FastNavbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/User" element={<User />} />
          <Route path="/Help" element={<Help />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/Clothes" element={<Clothes />} />
          <Route path="/Books" element={<Books />} />
          <Route path="/Rent" element={<Rent />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
