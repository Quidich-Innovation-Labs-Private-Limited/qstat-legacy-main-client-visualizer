import React from "react";
import "./App.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Toaster } from 'react-hot-toast';

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";

import Header from "../src/components/Header";

import "./style/main.css";

import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import Page1 from "./components/match";
import Page2 from "./components/Page2/Page2";
import Page3 from "./components/Page3/Page3";

import Team from "./pages/Team";
import Calender from "./pages/Calender";
import Documents from "./pages/Documents";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import styled from "styled-components";

//Amplify.configure(awsExports);

const Theme = createTheme({
  palette: {
    secondary: {
      main: grey[500],
    },
  },
});

function App({ signOut, user }) {
  return (
    <ThemeProvider theme={Theme}>
      <div className="App">
        <div className="dashboard">
          <div class="sidebar">
            <Header signOut={signOut} />
          </div>
          <div className="stage">
            <>
              <Router>
                <Switch>
                  <Route exact path="/compare_screen" component={Page3} />
                  <Route exact path="/ball_Screen" component={Page2} />
                  <Route exact path="/">
      <Redirect to="/match" />
    </Route>
                  <Route exact path="/match" component={Page1} />
                  <Route exact path="/team" component={Team} />
                  <Route exact path="/calender" component={Calender} />
                  <Route exact path="/documents" component={Documents} />
                  <Route exact path="/projects" component={Projects} />
                </Switch>
              </Router>
            </>
          </div>
        </div>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
