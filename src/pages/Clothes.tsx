import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import  sliderItems  from "../data.json";

export function Clothes() {
  return (
    <div>
      <h1>Clothes</h1>
      <Row md={2} xs={1} lg={4} className={"g-3"}>
        {sliderItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item}/>
          </Col>
        ))}
      </Row>
    </div>
  );
}
