import React from "react";
import { Row, Col } from "react-bootstrap";
import "../formating/layout.css";

export const Help = () => {
    return (
        <div className="help-container d-flex justify-content-center align-items-center">
            <div className="text-center">
                <h1 className="help-heading">lépjen kapcsolatba velünk</h1>
                <h5>Lépjen velünk kapcsolatba, és mondja el hogyan tudunk segíteni.</h5>
                <Row lg={8} md={8} xs={8} style={{marginTop:"80px"}} className="square-container">
                    <Col className="square">
                        <div className="inner-square">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/2344/2344684.png"
                                alt="Help"
                                style={{
                                    width: "80px",
                                    height: "80px",
                                }}
                            />
                        </div>
                    </Col>
                    <Col className="square">
                        <div className="inner-square">
                            <img
                                src="../../public/pictures/question-mark.png"
                                alt="Help"
                                style={{
                                    width: "80px",
                                    height: "80px",
                                }}
                            />
                        </div>
                    </Col>
                    <Col className="square">
                        <div className="inner-square">
                            <img
                                src="../../public/pictures/support.png"
                                alt="Help"
                                style={{
                                    width: "80px",
                                    height: "80px",
                                }}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
