import React, { useEffect, useState } from "react";
import { Button, Modal,Form, Row, Col, Container } from 'react-bootstrap';
import * as GraphServer from "./GraphServer";


const GraphItem =  (props) => {
  const [ loading, setLoading ] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [data, setData] = useState();
  const [graphData, setGraphData] = useState({});
  const handleClose = () => setShowInfo(false);
  const handleShow = () => setShowInfo(true);
   // const [graph, setGraph] = useState([]);
    const getbyId = async (id) => {
        try {
            const res = await GraphServer.getGraphbyId(id);
            const data = res.json();
            setData([data]);
            handleShow();
            console.log(data,'sa')
        } catch (error) {
            console.log(error)
        }
    }
    const deleteG = async (id) => {
        try {

            const res = await GraphServer.deleteGraph(id);
            // window.location.reload(false);
            const data = await res.json();
            
            console.log(data,'sa')
        } catch (error) {
            console.log(error)
        }
    }
 
    const onVisualize  = () =>
    {
      console.log('visualize');
      console.log(data[0]);
      data[0].graph?.data?.map(item => {
        console.log(item);
      }
      );
    }

    // console.log(props.graph.id)
  return (
    <>
      <Container>
        <div className="col-md-12">
          <div className="card card-body">
        <h3 className="card-tittle">{props.graph.graph.name}</h3>
        <h3 className="card-text">id: {props.graph.id}</h3>
        <Button variant="primary" onClick={() => getbyId(props.graph.id)}>Details</Button>
        <Button variant="alert" onClick={() => deleteG(props.graph.id)}>Delete</Button>
          
          </div>
          <Modal
          show={showInfo}
          keyboard={true}
          >
            <Form
              onSubmit={()=> console.log("hola")}
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
                  data=== undefined && <Row>
                        <p>
                          No se ha logrado la carga de los datos
                        </p>
                      </Row>
                
                }

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={()=> handleClose("newNode") }>
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