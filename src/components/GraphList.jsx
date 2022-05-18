import React, { useEffect, useState } from "react";
import * as GraphServer from "./GraphServer";
import GraphItem from "./GraphItem";
import { Row, Col } from "react-bootstrap";
const GraphList = () => {
    const [graphs, setGraphs] = useState([]);

    const listGraph = async () => {
        try {
            const res = await GraphServer.listGraph();
            const data = await res.json();
            setGraphs(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        listGraph();
    }, []);

    return (
        <div className="row ">
        {
            graphs.map( (graph) => (
              
              <Row>
                <Col>
                  <GraphItem  graph={graph}/>
                </Col>
              </Row>
   
            ))
        }
        </div>
      );
};

export default GraphList;

/**(
        
    ); */