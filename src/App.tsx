import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";
import {Container} from "react-bootstrap";
import {Home} from "./pages/Home";
import {Help} from "./pages/Help";
import {User} from "./pages/User";
import {Navbar} from "./components/Navbar";
import {NotFound} from "./pages/NotFound";
import {FastNavbar} from "./components/FastNavbar";
import {Clothes} from "./pages/Clothes";
import {Items} from "./pages/Items";
import {Rent} from "./pages/Rent";
import {Listings} from "./pages/Listings";
import Footer from "./components/Footer";
import {SellItem} from "./pages/SellItem";
import {SelectListings} from "./components/ItemsCollection";
import {Favourites} from "./pages/Favourites";

function App() {
    return (
        <>
            <Navbar/>
            <FastNavbar/>
            <Container className="mb-4">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/User" element={<User/>}/>
                    <Route path="/Help" element={<Help/>}/>
                    <Route path="*" element={<NotFound/>}/>
                    <Route path="/All" element={<SelectListings/>}/>
                    <Route path="/Clothes" element={<Clothes/>}/>
                    <Route path="/Items" element={<Items/>}/>
                    <Route path="/Rent" element={<Rent/>}/>
                    <Route path="/Listings" element={<Listings/>}/>
                    <Route path="Sellitem" element={<SellItem/>}/>
                    <Route path="/Favourites" element={<Favourites/>}/>
                </Routes>


            </Container>
            <Footer/>


        </>
    );
}

export default App;
