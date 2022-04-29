import React from "react";
const GraphItem = (props) => {
    console.log(props.graph.graph.data[0].ide)
    return (
        <div className="col-md-4">
            <div className="card card-body">
                <h3 className="card-tittle">{props.graph.graph.name}</h3>
            </div>
        </div>
    );


};

export default GraphItem;