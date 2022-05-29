import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Button, Modal, Form, Row, Col, Container } from 'react-bootstrap';
import { Loader } from './Loader';
import { addNotification } from "../actions/others";
import * as GraphServer from "./GraphServer";


const GraphItem = (props) => {
  const navigate = useHistory();
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [data, setData] = useState();
  const [graphData, setGraphData] = useState({});
  const handleClose = () => setShowInfo(false);
  const handleShow = () => setShowInfo(true);
  // const [graph, setGraph] = useState([]);
  const getbyId = async (id) => {
    setLoading(true);
    try {
      const res = await GraphServer.getGraphbyId(id);
      const data = await res.json();
      setData([data])
      addNotification("success", "Success", "Graph loaded");
    } catch (error) {
      console.log(error)
    }
    setLoading(false);
  }
  const deleteG = async (id) => {
    try {

      const res = await GraphServer.deleteGraph(id);
      window.location.reload(false);
      addNotification("warning", "Success", "Graph deleted");


    } catch (error) {
      console.log(error)
    }
  }

  const onVisualize = () => {
    navigate.push('/visualizacion', { data: data[0] });
  }

  // console.log(props.graph.id)
  return (
    <>
      <Container>
        <div className="col-md-12">
          {
            loading ? (
              // className="spinner-border text-primary" role="status"
              <div>
                <Loader />
              </div>
            ) : (

              <div className="card card-body">
                <h3 className="card-tittle">{props.graph.graph.name}</h3>
                <h3 className="card-text">id: {props.graph.id}</h3>
                <Button 
                  variant="primary" 
                  onClick={() => getbyId(props.graph.id)
                  .finally( handleShow())}
                >Details</Button>
                <Button variant="alert" onClick={() => deleteG(props.graph.id)}>Delete</Button>

              </div>
            )
          }

          <Modal
            show={showInfo}
            keyboard={true}
          >
            <Form
              onSubmit={() => console.log("hola")}
            >
              <Modal.Body>
                {
                  data && data?.map((info, index) => {
                    return (
                      <div key={index}>
                        <Row>
                          <Col>
                            <h5>Identificador:</h5>
                          </Col>
                          <Col>
                            <p>{info.id}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <h5>Nombre:</h5>
                          </Col>
                          <Col>
                            <p>{info.graph?.name}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <h5>Cantidad de Nodos:</h5>
                          </Col>
                          <Col>
                            <p>{info.graph?.data?.length}</p>
                          </Col>
                        </Row>
                      </div>
                    )
                  })
                }
                {
                  data === undefined && <Row>
                    <p>
                      No se ha logrado la carga de los datos
                    </p>
                  </Row>

                }

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose("newNode")}>
                  Close
                </Button>
                <Button variant="primary" onClick={onVisualize} >
                  Visualize
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
      </Container>
    </>
  );

}

export default GraphItem;