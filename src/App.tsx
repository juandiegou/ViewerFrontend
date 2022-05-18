import React, { useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Dashboard } from "./layout";
import {ReactNotifications} from "react-notifications-component";
import {Loader} from "./components/Loader";

const App = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {
        loading && <Loader />
      }
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

