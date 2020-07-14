import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "./app/styles/main.scss";
// import "bootstrap/dist/css/bootstrap-theme.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./app/route/Home/Home";
import Registration from "./app/route/Registration/Registration";
import { PrivateRoute } from "./app/route/PrivateRoute";
import Login from "./app/route/Login/Login";
import { HOME, REGISTER, LOGIN } from "./app/constant";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer
        type="default"
        position={toast.POSITION.TOP_RIGHT}
        autoClose={4000}
        hideProgressBar
        pauseOnHover
      />
      <Router history={createBrowserHistory()}>
        <Switch>
          <PrivateRoute exact path={HOME} component={Home} />
          <Route exact path={REGISTER} component={Registration}></Route>
          <Route exact path={LOGIN} component={Login}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
