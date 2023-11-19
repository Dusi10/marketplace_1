import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { string } from "yup";

interface Props {
  show: boolean;
  hide: () => void;
  title: string;
  body: string;
  button1Text?: string;
  button1Click?: () => void;
}

const AlertBox = ({
  show,
  hide,
  title,
  body,
  button1Text,
  button1Click,
}: Props) => {
  return (
    <div>
      <Modal show={show} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingInline: "10px",
            paddingBottom: "10px",
          }}
        >
          {button1Text && (
            <Button variant="primary" onClick={button1Click}>
              {button1Text}
            </Button>
          )}
          <Button variant="secondary" onClick={hide}>
            Bezár
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AlertBox;
