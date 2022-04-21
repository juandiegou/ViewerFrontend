import React from "react";
import { Row, Spinner } from "react-bootstrap";

export const Loader = () => {
  return (
    <Row>
    <div
      style={{
        display: "table",
        margin: "0 auto",
        paddingTop:"50px"
      }}
    >
      <Spinner
        className="text-center"
        animation="border"
        variant="primary"
        style={{ width: "6rem", height: "6rem" }}
      />
      <h4 className="text-center">Cargando</h4>
    </div>
  </Row>
  );
};
