import { Image, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../../assets/css/menu.css";
import Admin from "../../assets/images/admin.png";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import React from 'react';


export const Menu = () => {

  const { user } = useSelector((store: RootState) => {
    return store.auth;
  });


  return (

    <div className="menu" >

      <Card>
        <div style={{ margin: "0 auto", display: "block" }}>
          <Image src={Admin} fluid className="profile" roundedCircle></Image>
          <p className="text-center font-weight-bold mt-3">{user['first_name']}</p>
        </div>
        <Card.Title>
          <p className="title-menu">Menu</p>
        </Card.Title>


        <ul className="menu-items">
          <li>
            <NavLink to={"/dashboard"} activeClassName="item-active" >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to={`/visualizacion`} activeClassName="item-active">
              Visualizar grafo
            </NavLink>
          </li>
          <li>
            <NavLink to={`/algoritmos`} activeClassName="item-active">
              Algoritmos
            </NavLink>
          </li>
          <li>
            <NavLink to={`/estadisticas`} activeClassName="item-active">
              Estadisticas
            </NavLink>
          </li>
        </ul>




      </Card>

    </div>
  );
};
