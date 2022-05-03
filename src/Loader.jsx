// Dependencies
import React from "react";
import { Row, Spinner } from "react-bootstrap";

const Loader = () => (
  <Row>
    <div
      style={{
        display: "table",
        paddingTop:"50px",
        margin: "0 auto",
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

export default Loader;
