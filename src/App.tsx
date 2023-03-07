import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Help } from "./pages/Help";
import { User } from "./pages/User";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/User" element={<User />} />
          <Route path="/Help" element={<Help />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
