import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Help } from "./pages/Help";
import { User } from "./pages/User";
import { Navbar } from "./components/Navbar";
import {NotFound} from "./pages/NotFound"

function App() {
  return (
    <>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/User" element={<User />} />
          <Route path="/Help" element={<Help />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;
