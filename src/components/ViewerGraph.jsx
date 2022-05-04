import React, {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Button, Modal, Form , Col, Row } from 'react-bootstrap';
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed';
import Graph from "react-graph-vis";
import { useToImage } from '@hcorta/react-to-image'
import { Upload } from "./Upload";
import "../assets/css/graph.css";

export const ViewerGraph = () => {
  const [numLinks, setNumLinks] = useState();
  const { ref, isLoading, getPng } = useToImage();
  const [modal, setModal]= useState({"upload":false, "newNode":false, "setLinks":false});
  const [config, setCofig] = useState( {
    nodeHighlightBehavior: true,
    node: {
        color: 'red',
        size: 120,
        highlightStrokeColor: 'black'
    },
    link: {
        color: 'black',
        highlightColor: 'black'
    },
    initialZoom: 1,
  });
  const [data, setData] = useState({
    nodes: [ { id: 1, label: "Harry" }, { id: 2, label:"Sally" }, { id: 3 ,label: "Alice" } ],
    edges: [ { from: 1, to: 2 }, { from: 1, to: 3 } ],
  });
  const handleShow = (modalName) => setModal({...modal, [modalName]:true});
  const handleClose = (modalName) => setModal({...modal, [modalName]:false});

  const onClickGraph = () => {
    handleShow("newNode");
  };

  const onSetLinks = () => {
    console.log("onSetLinks");
    handleClose("newNode");
    if (numLinks ) {
      handleShow("setLinks");
    }
  }

  const onClickNode = (nodeId) => {
    console.log(`Clicked node ${nodeId}`);
  };

  const onDoubleClickNode = (nodeId) => {
    console.log(`Double clicked node ${nodeId}`);
  };

  const onRightClickNode = (event, nodeId) => {
    console.log(`Right clicked node ${nodeId}`);
  };

  const onClickLink = (source, target) => {
    console.log(`Clicked link between ${source} and ${target}`);
  };

  return (
    <div className="graph">
      <Card>
        <Card.Header>
         <Button variant="info" onClick={() => handleShow("upload")} >
           Subir Archivo
          </Button>
          <Button 
          variant="info"
          onClick={()=>getPng()}
          >
           Descargar Imagen
          </Button>
          <Button>
           Exportar Archivo
          </Button>          
        </Card.Header>
        <Card.Body > 
        <ResponsiveEmbed aspectRatio={'4by3'}  ref={ref}>
            <div className="container__graph-area">
              <picture>
                <Graph 
                  graph={data}
                />
              </picture>                
            </div>
          </ResponsiveEmbed>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <Modal
        show={modal.upload}
        onHide={()=> handleClose("upload")}
        keyboard={true}
      >
        <Modal.Body>       
          <Upload></Upload>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={(e)=> handleClose("upload")}>
            Close
          </Button>

         
        </Modal.Footer>
      </Modal>

      <Modal
        show={modal.newNode}
        onHide={()=> handleClose("newNode")}
        keyboard={true}
      >
        <Form
          onSubmit={()=> console.log("hola")}
          >
          <Modal.Body>
            <Form.Group>
              <Form.Label>
                Identificador <span className="text-danger">*</span>
              </Form.Label>  
              <Form.Control
                placeholder={"nombre del nodo"}
                type="text"
              />
              <Form.Label>
                Cantidad de Aristas <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                placeholder={"cantidad de aristas"}
                type="number"
                min="0"
                onChange={(e)=> setNumLinks(e.target.value)}
              />
              {
                numLinks > 0 &&
                (

                  Array.from({length: numLinks}).map((k,v) => (                   
                      <Form.Group key={k}>
                        <Form.Label>
                          Arista  <span className="text-danger">*</span>
                        </Form.Label>
                        <Row>
                          <Col>
                            <Form.Control
                              placeholder={"nombre del nodo origen"}
                              type="text"
                            />
                          </Col>
                          <Col>
                            <Form.Control
                              placeholder={"nombre del nodo destino"}
                              type="text"
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                  ))

                )
              }              
            </Form.Group> 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=> handleClose("newNode") }>
              Close
            </Button>
            <Button variant="primary" onClick={()=> onSetLinks() }>
              Save Changes
            </Button>
          </Modal.Footer>
          </Form>
      </Modal>
    </div>
  )
}
