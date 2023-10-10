import React, { useState, useRef, useEffect } from "react";
import {Button, Container, Nav, Navbar as NavbarBs} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../formating/format.css"
interface Logo {
    profilePicture: string;
    logOutLogic: VoidFunction
}

export function ProfileLogo({ profilePicture, logOutLogic }: Logo) {
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
        <div>
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
                    <ul style={{marginRight: "10px", marginTop: "7px"}}>
                        <li>
                            <Link className={"default-link"} to={"/User"}>User</Link>
                        </li>
                        <li>
                            <Link className={"default-link"} to={"/Listings"}>Your Listings</Link>
                        </li>
                        <li>
                            <Link className={"default-link"} to={"/Help"}>Help</Link>
                        </li>
                        <li>
                            <Link className={"default-link"} to={"/Sellitem"}>Sell Item</Link>
                        </li>
                        <li>
                            <p className={"hover-2"} onClick={logOutLogic} >Logout</p>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}



