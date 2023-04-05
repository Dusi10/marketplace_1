import React from "react";
import { Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";

export interface ItemProps{
    id: string | number,
    title: string,
    description?: string,
    price: number,
    images: string,
    

}
// Design for the items which are for sale
export const StoreItem = ({id, title, price, images, description }:ItemProps) => {
  return (
    <div>
      <Card className="h-100%" >
        <Card.Img
          variant="top"
          src={images}
          height="300px"
          style={{ objectFit: "cover"}}
        />
        <Card.Body className="d-flex flex-column" >
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-2">
          <span className="fs-3">{title}</span>
          <span className="ms-2 text-muted"> {formatCurrency(price)}</span>
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StoreItem;
