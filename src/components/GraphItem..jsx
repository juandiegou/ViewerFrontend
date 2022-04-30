import React, { useEffect, useState } from "react";
import * as GraphServer from "./GraphServer";
import { Button } from 'react-bootstrap';

const GraphItem =  (props) => {

   // const [graph, setGraph] = useState([]);
    const getbyId = async (id) => {
        try {

            const res = await GraphServer.getGraphbyId(id);
            const data = await res.json();
            
            console.log(data,'sa')
        } catch (error) {
            console.log(error)
        }
    }
    const deleteG = async (id) => {
        try {

            const res = await GraphServer.deleteGraph(id);
            window.location.reload(false);
            const data = await res.json();
            
            console.log(data,'sa')
        } catch (error) {
            console.log(error)
        }
    }
 
    // console.log(props.graph.id)
    return (
        <div className="col-md-4">
            <div className="card card-body">
                <h3 className="card-tittle">{props.graph.graph.name}</h3>
                <h3 className="card-text">id: {props.graph.id}</h3>
                <Button variant="primary" onClick={() => getbyId(props.graph.id)}>Details</Button>
                <Button variant="alert" onClick={() => deleteG(props.graph.id)}>Delete</Button>
               
            </div>
        </div>
    );


};

export default GraphItem;