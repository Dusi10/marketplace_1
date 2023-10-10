import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import {HeartComponent} from "./Heart";
import {Likes} from "./Dislikes";
export interface ItemProps{
    id: string | number,
    title: string,
    description?: string,
    price: number,
    images: string,
    itemType: string
    

}
// Design for the items which are for sale
export const StoreItem = ({id, title, price, images, description, itemType }:ItemProps) => {
  const [hovered, setHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false)
  const handleText = () => {
    setHovered(!hovered)
  };

  return (
    <div>
      <Card
        className="h-100%"
        onClick={handleText}
        style={{cursor: "pointer"}}
      >
        <Card.Img
          variant="top"
          src={images}
          height="300px"
          style={{ objectFit: "cover", borderBottom: "1px solid #dee2e6" }}
        />
        <Card.Text
          className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            opacity: hovered ? "1" : "0",
            transition: "opacity 0.3s",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            color: "black",
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          <span style={{marginLeft: "5px", marginRight: "5px"}}>{description}</span>
        </Card.Text>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-2">
            <span className="fs-4">{title}</span>
            <span className="ms-2 text-muted">{formatCurrency(price)}</span>
          </Card.Title>

        </Card.Body>
      </Card>
    </div>

  );
};

export default StoreItem;
