import React from 'react'
import { Col } from 'react-bootstrap'

interface HelpCardProps {
    image: string,
    title: string,
    desc: string
}

const HelpCard = ({image, title, desc}:HelpCardProps) => {
  return (
    <Col className="square">
    <div className="inner-square">
      <img
        src={image}
        alt="Help"
        style={{
          width: "120px",
          height: "120px",
        }}
      />
    </div>
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "120px", // Set your fixed width
      height: "120px", // Set your fixed height
    }}>
      
    </div>
    <p style={{ fontWeight:"bold"}}>{title}</p>
    <p>{desc}</p>
  </Col>
  )
}

export default HelpCard