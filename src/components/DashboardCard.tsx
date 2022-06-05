import React, { useEffect } from 'react';
import '../assets/css/menu.css';
import Aux from '../hoc/_Aux';
import GraphList from './GraphList';
import { addNotification } from '../actions/others';





export const DashboardCard = () => {
  useEffect(() => {
    addNotification('info', 'info', 'loading data');
  }, [])


  return (
    <Aux>
      <GraphList />
    </Aux>

  )
}


