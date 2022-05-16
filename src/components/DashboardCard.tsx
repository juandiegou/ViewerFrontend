import React, { useEffect } from 'react';
import { Row,Col,Card,CardGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram,faUpload,faMagic,faChartPie } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/menu.css';
import Aux from '../hoc/_Aux';
import GraphList from './GraphList';
import { addNotification } from '../actions/others';





export const DashboardCard = () => {
  useEffect(() => {
    addNotification('info','info','loading data');
  }, [])
  

  return (
       
      
    <GraphList/>
        
    )
}


