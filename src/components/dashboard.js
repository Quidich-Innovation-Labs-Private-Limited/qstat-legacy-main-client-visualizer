import React from "react";
import Menu from "./menu";
import Search from "./search";
import Filters from "./filters";
import Header from "./Header";

import "../style/main.css";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Page1 from "./Page1/Page1";
import Page2 from "./Page2/Page2";
const dash = (props) => {
  return (
    <>
      <div className="dashboard">
        <div class="sidebar">
          <Header />
        </div>
        <div className="stage">
          <>
            <Router>
              <Switch>
                <Route exact path="/" component={Page1} />
                <Route exact path="/ball_Screen" component={Page2} />
              </Switch>
            </Router>
          </>
        </div>
      </div>
    </>
  );
};

export default dash;
