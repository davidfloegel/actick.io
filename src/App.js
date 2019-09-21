import React from "react";
import styled, { ThemeProvider } from "styled-components";

import GlobalStyle from "./theme/global";
import theme from "./theme/theme";

import Navbar from "./components/navbar";
import Listing from "./pages/listing";

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
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <GlobalStyle />
        <Layout>
          <Navbar />
          <Container>
            <Title>Bookaspace v0.1.0</Title>

            <Listing />
          </Container>
        </Layout>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
