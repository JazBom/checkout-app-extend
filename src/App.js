import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import { ProductCheckOutPage } from './components/ProductCheckOutPage';

const App = () => {

  return (
    <Router>
    <div className="App">
      
      <Switch>

          <Route exact path="/">
            <ProductCheckOutPage/>
          </Route>

          {/* I would put more routes in here once the UI interface became more complex - e.g. separate log-in, select product and checkout pages */}

        </Switch>
    </div>
    </Router>
  );
};
export { App };
