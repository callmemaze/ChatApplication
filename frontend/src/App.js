import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Room from "./components/Room";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/room" component={Room}></Route>
      </Switch>
    </Router>
  );
};

export default App;
