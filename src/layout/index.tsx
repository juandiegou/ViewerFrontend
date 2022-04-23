import React, { Suspense } from "react";
import { Redirect, Route, Switch, } from "react-router-dom";
import { Menu } from "./dashboard/Menu";
import { DashboardCard } from "../components/DashboardCard";
import { DashboardSummary } from "../components/DashboardSummary";
import "../assets/css/menu.css";
import { Container, Row, Col } from "react-bootstrap";
import { Algorithms } from "../components/Algorithms";
import { Statistics } from "../components/Statistics";
import {  ViewerGraph } from "../components/ViewerGraph";


export const Dashboard = () => {

  return (
    <div className="main-container">
      <Row>
        <Col xs={3} md={3} lg={3} sm={3} >
          <Menu></Menu>
        </Col>
      <Col>
          <Container>
            <Suspense fallback={<div>Cargando...</div>}>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/dashboard"></Redirect>
                </Route>
                <Route exact path="/Dashboard">
                  <Container fluid="md" className="p-3">
                    <DashboardCard></DashboardCard>
                    <DashboardSummary></DashboardSummary>
                  </Container>
                </Route>
                <Route exact path="/visualizacion">
                  <Container fluid="md" className="p-3">
                    <ViewerGraph></ViewerGraph>                
                  </Container>
                </Route>
                <Route exact path="/algoritmos">
                  <Container fluid="md" className="p-3">
                    <Algorithms></Algorithms>
                  </Container>
                </Route>
                <Route exact path="/estadisticas">
                  <Container fluid="md" className="p-3">
                    <Statistics></Statistics>
                  </Container>
                </Route>

              </Switch>
            </Suspense>
          </Container>
            
        </Col> 
    </Row>
    </div>
  );
};
