import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Dashboard } from "./layout";
import {ReactNotifications} from "react-notifications-component";


const App = () => {

  return (
    <>

      <ReactNotifications />

      <Router>
      
        <div>
          <Switch>
            <Route path="/" component={Dashboard} ></Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;

