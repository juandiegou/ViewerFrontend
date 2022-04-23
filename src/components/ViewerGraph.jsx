import React, {useState} from 'react'
import { faUpload,faDownload,faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Button, Modal, Form , Col, Row } from 'react-bootstrap';
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed';
import { Graph } from "react-d3-graph";
import { Upload } from "./Upload";
import "../assets/css/graph.css";
const d3ToPng = require('d3-svg-to-png');	


export const ViewerGraph = () => {
  const [numLinks, setNumLinks] = useState();
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
    nodes: [ { id: "Harry" }, { id: "Sally" }, { id: "Alice" } ],
    links: [ { source: "Harry", target: "Sally" }, { source: "Harry", target: "Alice" } ],
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

    
  const onDownload = () => {
    d3ToPng("svg",'graph',{scale: 5, format: "png", quality: 1});
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
          {/* <FontAwesomeIcon
            icon={faUpload}
            className="menu-icon"
          ></FontAwesomeIcon>  */}
           Subir Archivo
          </Button>
          <Button 
          variant="info"
          onClick={() => onDownload()}
          >
          {/* <FontAwesomeIcon
            icon={faDownload}
            className="menu-icon"
          ></FontAwesomeIcon>  */}
           Descargar Imagen
          </Button>
          <Button>
          {/* <FontAwesomeIcon
            icon={faFileExcel}
            className="menu-icon"
          ></FontAwesomeIcon>  */}
           Exportar Archivo
          </Button>          
        </Card.Header>
        <Card.Body>
        <ResponsiveEmbed aspectRatio={'4by3'}>
            <div className="container__graph-area">
              <picture>
                <Graph 
                  id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                  data={data}
                  config={config}
                  onClickNode={onClickNode}
                  onClickLink={onClickLink}
                  onClickGraph={onClickGraph}
                  onRightClickNode={onRightClickNode}
                  onDoubleClickNode={onDoubleClickNode}

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
          <Button variant="primary">
            Save Changes
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
