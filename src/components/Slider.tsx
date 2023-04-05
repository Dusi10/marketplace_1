import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import "../formating/pictures.css";
import { Card, Container } from "react-bootstrap";
import { ItemsCollection } from "./ItemsCollection";

const Arrow = styled.div<{ direction: "left" | "right" }>`
  width: 50px;
  height: 50px;
  background-color: black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => props.direction === "left" && "left: 10px"};
  ${(props) => props.direction === "right" && "right: 10px"};
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;
const Wrapper = styled.div`
  height: 100%;
  display: flex
`;
const Slide = styled.div`
padding: 10px;
  display: grid;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 30px;
`;
const ImgContainer = styled.div`
height: 100%;

`;
const InfoContainer = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const Image = styled.img`
height: 150px;
border-radius: 30px;
`;
const Title = styled.h4`
  margin: 0;
  grid-column: 1 / span 1;
`;
const Price = styled.h4`
  margin: 0;
  grid-column: 2 / span 1;
  margin-right: 1020px
`;
const Desc = styled.p`
max-width: 230px
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction: string) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <>
      <Container className="position-relative">
        <Arrow direction="left" onClick={() => handleClick("left")}>
          <ArrowLeftOutlined className="bg-white" />
        </Arrow>
        <Wrapper>
          <Slide>
            <ItemsCollection/>
          </Slide>
          
        </Wrapper>
        <Arrow direction="right" onClick={() => handleClick("right")}>
          <ArrowRightOutlined className="bg-white" />
        </Arrow>
      </Container>
      <Container>
        
      <div className="pictures-container mb-4">
          <img
            className="picture"
            src="src\pictures\generic book open.jpg"
            alt="Book"
          />
        </div>
      </Container>
    </>
  );
};
export default Slider;
