import React, { useState, useRef, useEffect } from "react";
import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../formating/format.css"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

interface Logo {
    profilePicture: string;
    logOutLogic: VoidFunction
}

export function ProfileLogo({ profilePicture, logOutLogic }: Logo) {
    const [user] = useAuthState(auth);

    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Function to handle clicks outside of the dropdown
    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setDropdownVisible(false);
        }
    };

    // Add a click event listener to the document to detect clicks outside of the dropdown
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleImageClick = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    return (
        <div >
            <img
                src={profilePicture || ""}
                alt="User profile"
                style={{
                    width: "40px",
                    height: "40px",
                    cursor: "pointer",
                    borderRadius: "50%",
                }}
                onClick={handleImageClick}
                className={"slice-img"}
            />
            {isDropdownVisible && (
                <div
                    ref={dropdownRef}
                    style={{
                        position: "absolute",
                        top: "60px",
                        right: "30px",
                        background: "white",
                        border: "2px solid #ccc",
                        borderRadius: "4px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                        zIndex: 1,
                    }}
                    className={"dropdown-content"}
                >
                    {/* Dropdown content goes here */}
                    <ul style={{ marginRight: "5px", marginTop: "5px" }}>
                        <p style={{ margin: "1px" }}>
                            <Link className={"default-link"} to={`/SellerProfile/${user?.uid}`}>Profil</Link>
                        </p>
                        <p style={{ margin: "2px" }}>
                            <Link className={"default-link"} to={"/Listings"}>Hirdetéseid</Link>
                        </p>
                        {/* <p style={{margin: "2px"}}>
                            <Link className={"default-link"} to={"/Help"}>Segítség</Link>
                        </p> */}
                        <p style={{ margin: "2px" }}>
                            <Link className={"default-link"} to={"/Sellitem"}>Tárgy Eladás</Link>
                        </p>
                        <p style={{ margin: "2px" }}>
                            <Link className={"default-link"} to={"/Favourites"}>Kedvencek</Link>
                        </p>
                        <p style={{ paddingBottom: "10px", margin: "2px" }}>
                            <Link className={"default-link"} to={"/ChatPage"}>Üzenetek</Link>
                        </p>

                        <p className={"custom-button fill-button"} style={{ color: "red", display: "flex", justifyContent: "center", }} onClick={logOutLogic}>Kijelentkezés</p>

                    </ul>
                </div>
            )}
        </div>
    );
}



