import React, {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Button, Modal, Form , Col, Row } from 'react-bootstrap';
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed';
import Graph from "react-graph-vis";
import { useToImage } from '@hcorta/react-to-image'
import { Upload } from "./Upload";
import "../assets/css/graph.css";

export const ViewerGraph = () => {
  const [network, setNetwork] = useState();
  const [currentEvent, setCurrentEvent] = useState();
  const [currentNode, setCurrentNode] = useState();
  const [currentFrom, setCurrentFrom] = useState();
  const [currentTo, setCurrentTo] = useState();
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
    nodes: [ { id: 1, label: "A" }, { id: 2, label:"B" }, { id: 3 ,label: "D" } ],
    edges: [ { from: 1, to: 2 }, { from: 1, to: 3 } ],
  });

  const [options, setOptions] = useState({
    manipulation: {
      enabled: false,
      initiallyActive: false,
      addNode: true,
      addEdge: true,
      editEdge: true,
      deleteNode: true,
      deleteEdge: true,
    }
  });
  
  const handleShow = (modalName) => setModal({...modal, [modalName]:true});
  const handleClose = (modalName) => setModal({...modal, [modalName]:false});

  const events ={
    doubleClick : function(event) {
      setCurrentEvent(event);
      handleShow("newNode");
    },
    selectNode: function(event) {
      console.log(event);
    },
    selectEdge: function(event) {
      console.log(data.nodes);     
      console.log(event);
    },
  }

  const onAddNode =() => {
    if(currentNode){
      console.log(network, data,currentEvent);
      const idTemp=data.nodes.length+1;
      const x =currentEvent.pointer.DOM.x;
      const y =currentEvent.pointer.DOM.y;
      data.nodes.push({id:idTemp,label:currentNode, x,y});
      //
      
      setData({...data});
      network.setData(data);
      setCurrentNode();
      setCurrentEvent();   
    }
   if(currentFrom && currentTo){
      console.log(currentFrom, currentTo)
      data.edges.push({from : currentFrom, to : currentTo, });
      setData({...data});
      network.setData(data);
      setCurrentFrom();
      setCurrentTo(); 

    }

    handleClose("newNode");
  }
  

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
                  options={options}
                  events={events}
                  getNetwork={network => {
                    setNetwork(network);
                  }}
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
        /**
         * modal of upload file
         */
        show={modal.upload}
        onHide={()=> handleClose("upload")}
        keyboard={true}
      >
        <Modal.Body>       
          <Upload></Upload>
          <Button variant="secondary" onClick={(e)=> handleClose("upload")}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
      
      <Modal
        /** modal of new node */
        show={modal.newNode}
        onHide={()=> handleClose("newNode")}
        keyboard={true}
      >
        <Form
          /**onSubmit={onAddNode}*/
          >
          <Modal.Body>
            <Form.Group>
              <Form.Label>
                Identificador 
              </Form.Label>  
              <Form.Control
                placeholder={"nombre del nodo"}
                type="text"
                value={currentNode?currentNode:""}
                onChange={(e)=> setCurrentNode(e.target.value)}
              />    
              <Form.Label>
                From 
              </Form.Label>  
               
              <Form.Control
                placeholder={"From"}
                type="text"
                value={currentFrom?currentFrom:""}
                onChange={(e)=> setCurrentFrom(e.target.value)}
              />    
              <Form.Label>
                To 
              </Form.Label>
               <Form.Control
                placeholder={"To"}
                type="text"
                value={currentTo?currentTo:""}
                onChange={(e)=> setCurrentTo(e.target.value)}
              />                  
            </Form.Group> 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=> handleClose("newNode") }>
              Close
            </Button>
            <Button variant="primary" onClick={onAddNode}>
              Save Changes
            </Button>
            
          </Modal.Footer>
          </Form>
      </Modal>
    </div>
  )
}