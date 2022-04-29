import React, { useEffect, useState } from "react";
import * as GraphServer from "./GraphServer";
import GraphItem from "./GraphItem.";
const GraphList = () => {
    const [graphs, setGraphs] = useState([]);

    const listGraph = async () => {
        try {
            const res = await GraphServer.listGraph();
            const data = await res.json();
            console.log(data)

            setGraphs(data);
            console.log(graphs.generalData1)
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
               
                <GraphItem  graph={graph}/>
   
            ))
        }
        </div>
      );
};

export default GraphList;

/**(
        
    ); */