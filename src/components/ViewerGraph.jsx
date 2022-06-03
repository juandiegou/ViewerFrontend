import React, { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom';
import { Card, Button, Modal, Form, Col, Row } from 'react-bootstrap';
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed';
import Graph from "react-graph-vis";
import { useToImage } from '@hcorta/react-to-image'
import { Upload } from "./Upload";
import { addNotification } from "../actions/others";
import { ExportJsonCsv } from "react-export-json-csv";
import * as GraphServer from "./GraphServer";


export const ViewerGraph = () => {
  const { state } = useLocation();
  const [network, setNetwork] = useState({});
  const [currentEvent, setCurrentEvent] = useState();
  const [currentNode, setCurrentNode] = useState();
  const [currentFrom, setCurrentFrom] = useState();
  const [currentTo, setCurrentTo] = useState();
  const { ref, isLoading, getPng } = useToImage();
  const headers = [{ key: 'ide', name: 'Identificador' }, { key: "label", name: 'etiqueta' }, { key: "type", name: "tipo" }, { key: "linkedTo", name: 'conexiones' }]
  let jvacio = require('../assets/files/jsonvacio.json');
  var casa = true


  const [modal, setModal] = useState({ "upload": false, "newNode": false, "setLinks": false });
  const [config, setCofig] = useState({
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
    nodes: [],
    edges: []
  });

  const [options, setOptions] = useState({
    manipulation: {
      enabled: true,
      initiallyActive: false,
      addNode: true,
      addEdge: true,
      editEdge: true,
      deleteNode: true,
      deleteEdge: true,
    }
  });
  const limpiar = () => {
    data.nodes = [];
    data.edges = [];
    setData({ ...data })
    network.setData(data)
  }

  const handleShow = (modalName) => setModal({ ...modal, [modalName]: true });
  const handleClose = (modalName) => setModal({ ...modal, [modalName]: false });

  const events = {
    click: function (event) {
      setCurrentEvent(event);
      if (state) {
        network.setData(data)
      }
    },
    doubleClick: function (event) {
      setCurrentEvent(event);
      handleShow("newNode");
    },
    selectNode: function (event) {

    },
    selectEdge: function (event) {

    },
  }


  const guardarGrafo = async () => {

    await GraphServer.registerGraph(JSON.stringify(jvacio));
    addNotification("success", "Success", "Graph saved");

  };

  const onAddNode = () => {

    if (currentNode) {

      const idTemp = data.nodes.length + 1;
      const x = currentEvent.pointer.DOM.x;
      const y = currentEvent.pointer.DOM.y;
      data.nodes.push({ id: idTemp, label: currentNode, x, y });
      //

      setData({ ...data });
      network.setData(data);
      setCurrentNode();
      setCurrentEvent();
      var ex = parseInt(x, 10)
      var ey = parseInt(y, 10)

      jvacio.graph.data.push({ ide: idTemp, label: currentNode, coordenates: { x: ex, y: ey }, linkedTo: [], radius: 1, type: 'Grafo dirigido' })

    }
    if (currentFrom && currentTo) {
      data.edges.push({ from: currentFrom, to: currentTo, });
      setData({ ...data });
      network.setData(data);
      jvacio.graph.data.forEach(element => {
        if (element.ide == currentFrom) {
          element.linkedTo.push({ nodeId: currentTo, distance: 0 })
        }
        console.log(jvacio)

      });
      setCurrentFrom();
      setCurrentTo();

    }
    addNotification("success", "Success", "Was added");
    handleClose("newNode");

  }

  useEffect(() => {
    console.log(state);
    pintar()
  }, [])

  const pintar = () => {
    if (state) {
      state.data.graph?.data?.map((node, index) => {
        data.nodes.push({ id: index + 1, label: node.label, x: node.coordenates.x, y: node.coordenates.y });
        setData({ ...data });
        node?.linkedTo.map((arista) => {
          data.edges.push({ from: node.ide, to: arista.nodeId })
          setData({ ...data });
        })
      })
    } else {
      addNotification('warning', 'info', 'No data');
    }
    casa = false
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
            onClick={() => getPng()}
          >
            Descargar Imagen
          </Button>
          <Button
            variant="info"
            onClick={() => guardarGrafo()}
          >
            Guardar grafo
          </Button>

          <ExportJsonCsv
            className="btn btn-info"
            headers={headers}
            items={state.data.graph.data}
          >
            Exportar archivo
          </ExportJsonCsv>
          <Button
            variant="info"
            onClick={() => limpiar()}
          >
            Limpiar
          </Button>

        </Card.Header>
        <Card.Body >
          <ResponsiveEmbed aspectRatio={'4by3'} ref={ref}>
            <div className="container__graph-area">
              <picture>
                {useMemo(() =>
                  <Graph
                    graph={data}
                    options={options}
                    events={events}
                    getNetwork={network => {
                      setNetwork(network);
                    }}
                  />
                  , [data, options]
                )
                }
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
        onHide={() => handleClose("upload")}
        keyboard={true}
      >
        <Modal.Body>
          <Upload></Upload>
          <Button variant="secondary" onClick={(e) => handleClose("upload")}>
            Close
          </Button>
        </Modal.Body>
      </Modal>

      <Modal
        /** modal of new node */
        show={modal.newNode}
        onHide={() => handleClose("newNode")}
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
                value={currentNode ? currentNode : ""}
                onChange={(e) => setCurrentNode(e.target.value)}
              />
              <Form.Label>
                From
              </Form.Label>

              <Form.Control
                placeholder={"From"}
                type="text"
                value={currentFrom ? currentFrom : ""}
                onChange={(e) => setCurrentFrom(e.target.value)}
              />
              <Form.Label>
                To
              </Form.Label>
              <Form.Control
                placeholder={"To"}
                type="text"
                value={currentTo ? currentTo : ""}
                onChange={(e) => setCurrentTo(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose("newNode")}>
              Close
            </Button>
            <Button variant="primary" onClick={onAddNode}>
              Save Changes
            </Button>

          </Modal.Footer>
        </Form>
      </Modal>
    </div >
  )
}
