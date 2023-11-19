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
import { Navbar } from "./components/Navbars/Navbar";
import { NotFound } from "./pages/NotFound";
import { FastNavbar } from "./components/Navbars/FastNavbar";
import { Clothes } from "./pages/SearchTypePages/Clothes";
import { Items } from "./pages/SearchTypePages/Items";
import { Rent } from "./pages/SearchTypePages/Rent";
import { Listings } from "./pages/Listings";
import Footer from "./components/Footer";
import { SellItem } from "./pages/SellItem";
import { SelectListings } from "./components/ItemsCollection";
import { Favourites } from "./pages/SearchTypePages/Favourites";
import ChatPage from "./pages/ChatPage";
import { useContext } from "react";
import backgroundImage from "../public/pictures/imgs/cool_pic.jpg";
import Food from "./pages/SearchTypePages/Food";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <>
      <Navbar />

      <FastNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/User" element={<User />} />
        <Route path="/Help" element={<Help />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/All" element={<SelectListings />} />
        <Route path="/Clothes" element={<Clothes />} />
        <Route path="/Items" element={<Items />} />
        <Route path="/Rent" element={<Rent />} />
        <Route path="/Listings" element={<Listings />} />
        <Route path="Sellitem" element={<SellItem />} />
        <Route path="/Favourites" element={<Favourites />} />
        <Route path="/ChatPage" element={<ChatPage />} />
        <Route path="Food" element={<Food />} />
        <Route path="SellerProfile/:sellerId" element={<Profile />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
