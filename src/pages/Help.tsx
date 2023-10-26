import React from "react";
import { Row, Col } from "react-bootstrap";
import "../formating/layout.css";
import HelpCard from "../components/HelpCard";

export const Help = () => {
  
  const pageTitle = "Lépjen kapcsolatba velünk"
  const pageDesc = "Lépjen velünk kapcsolatba, és mondja el hogyan tudunk segíteni."

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "700px",
        display: "flex",
        background: `url('../../public/pictures/imgs/cool_pic.jpg') center/cover no-repeat`,
        borderRadius: "20px",
      }}
    >
      <div className="text-center">
        <div style={{ padding: "5%" }}>
          <h1 className="help-heading" style={{ color: "white" }}>
            {pageTitle}
          </h1>
          <h5 style={{ color: "white" }}>
            {pageDesc}
          </h5>
        </div>
        <div style={{ display: "flex", paddingBottom: "15%" }} className="square-container">
          <HelpCard image="../../public/pictures/question-mark.png" title="Segítség" desc="nem tudom"/>
          <HelpCard image="../../public/pictures/question-mark.png" title="Segítség" desc="nem tudom"/>
          <HelpCard image="../../public/pictures/support.png" title="Segítség" desc="nem tudom"/>
        </div>
      </div>
    </div>
  );
};
