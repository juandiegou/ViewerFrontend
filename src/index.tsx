import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { generateStore } from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications-component/dist/theme.css";
import "./assets/css/index.css"
import 'moment/locale/es'
import reportWebVitals from "./reportWebVitals";


const store = generateStore();

ReactDOM.render(
  <React.StrictMode>
   
    <Provider store={store}>
      <App />
    </Provider>



  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
