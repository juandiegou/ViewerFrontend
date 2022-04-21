import React from 'react';
import { Row,Col,Card,CardGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram,faUpload,faMagic,faChartPie } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/menu.css';
import Aux from '../hoc/_Aux';





export const DashboardCard = () => {
    return (
       
        <Aux>
            <Row className="container-fluid show-grid flex-wrap" style={{display:'flex'}}>

               <CardGroup>
               <Col sm={6} md={8} lg={3} xs={9} >
                    <CardGroup>
                        <Card style={{ width: '18rem', padding:'1%' }}>
                            <Card.Body>
                                <FontAwesomeIcon
                                icon={faUpload}
                                size="4x"
                                className="mt-4"
                                style={{ color: "#1A66FF" }}
                                ></FontAwesomeIcon>
                                <h6 className="mt-1 mb-0">Carga de grafos</h6>
                            
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
                <Col sm={6} md={8} lg={3} xs={9}>
                    <CardGroup>
                        <Card style={{ width: '18rem', padding:'1%' }}>
                            <Card.Body>
                                <FontAwesomeIcon
                                icon={faProjectDiagram}
                                size="3x"
                                className="mt-4"
                                style={{ color: "#1A66FF" }}
                                ></FontAwesomeIcon>
                                <h6 className="mt-1 mb-0">Visualización de grafo</h6>
                                
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col> 
                <Col sm={6} md={8} lg={3} xs={9}>
                    <CardGroup>
                        <Card style={{ width: '18rem',padding:'1%' }} >
                            <Card.Body>
                                <FontAwesomeIcon
                                icon={faMagic}
                                size="3x"
                                className="mt-4"
                                style={{ color: "#1A66FF" }}
                                ></FontAwesomeIcon>
                                <h6 className="mt-1 mb-0">Aplicar Algoritmo</h6>
                                
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
                <Col sm={6} md={8} lg={3} xs={9}>
                    <CardGroup>
                        <Card style={{ width: '18rem', padding:'1%' }}>
                            <Card.Body>

                                <FontAwesomeIcon
                                icon={faChartPie}
                                size="4x"
                                className="mt-4"
                                style={{ color: "#1A66FF" }}
                                ></FontAwesomeIcon>
                                <h6 className="mt-1 mb-0">Estadísticas</h6>
                            
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
                  

               </CardGroup>

            </Row>
        </Aux>
        
    )
}


