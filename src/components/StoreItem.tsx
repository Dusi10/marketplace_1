import React, {useState} from "react";
import {Button, Card} from "react-bootstrap";
import {formatCurrency} from "../utilities/formatCurrency";
import {HeartComponent} from "./Heart";
import {Likes} from "./Dislikes";
import filledHeart from "../pictures/filledredheart.png"
import unFilledHeart from "../pictures/unfilledredheart.png"

export interface ItemProps {
    id: string | number,
    title: string,
    description?: string,
    price: number,
    images: string,
    itemType: string


}

// Design for the items which are for sale
export const StoreItem = ({id, title, price, images, description, itemType}: ItemProps) => {
    const [hovered, setHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false)
    const handleText = () => {
        setHovered(!hovered)
    };
    const sendMessage = () => {
        console.log("sendMessage function called"); // Add this line for debugging
        alert("Message sent");
    }
    const likeItem = () => {
        setIsLiked(!isLiked)
        alert(`You have ${isLiked ? "Disliked" : "Liked"} an item`)
    }
    const sendMessageToBuyer = () => {

    }


    return (
        <div>
            <div className="content-container">
                <div className="image-wrapper">
                    <img src={images} className="banner-image"></img>
                    <h1 className="heading-text">{title}</h1>
                    {/*<p className="paragraph-text">{description}</p>*/}
                    <h2 className="paragraph-text">{formatCurrency(price)}</h2>
                </div>
                <div className="button-wrapper">

                    <div className={"custom-button fill-button"} onClick={likeItem}>
                        {isLiked ? "Nem Tetszik" : "Tetszik"}
                    </div>


                    <button className="custom-button fill-button">Küldj Üzenetet</button>
                </div>
            </div>
        </div>

    );
};

export default StoreItem;
