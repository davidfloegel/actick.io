import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { StateProvider } from "./state";
import { StateProvider as ProjectsStateProvider } from "./state/projects";
import GlobalStyle from "./theme/global";
import theme from "./theme/theme";

import Navbar from "./components/navbar";
import Listing from "./pages/listing";

import Welcome from "./pages/welcome";

const Layout = styled.div`
  padding-top: 100px;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  margin: 0 0 25px 0;
`;

function App() {
  return (
    <BrowserRouter>
      <StateProvider>
        <ProjectsStateProvider>
          <ThemeProvider theme={theme}>
            <React.Fragment>
              <GlobalStyle />
              <Layout>
                <Navbar />

                <Route exact path="/" component={Welcome} />
                <Route exact path="/p/:id" component={Listing} />
              </Layout>
            </React.Fragment>
          </ThemeProvider>
        </ProjectsStateProvider>
      </StateProvider>
    </BrowserRouter>
  );
}

export default App;
