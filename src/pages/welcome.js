import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Title as H1 } from "./listing";
import AddProject from "../components/addNewProject";
import { useStateValue } from "../state/projects";

const Container = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 40px;
  grid-row-gap: 40px;
`;

const Card = styled(Link)`
  border: 1px solid red;
  max-width: 400px;
  border-radius: 2px;
  border: 1px solid #eee;
  box-shadow: 0px 7px 17px -10px rgba(0, 0, 0, 0.18);
  padding: 0;

  &:link,
  &:visited {
    color: #000;
    text-decoration: none !important;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 15px 10px;
  border-bottom: 1px solid #eee;
    text-decoration: none !important;
  }
`;

const Content = styled.div`
  padding: 10px;
`;

const Footer = styled.div`
  border-top: 1px solid #eee;
  padding: 10px 10px;
  font-size: 12px;
  text-align: center;
    text-decoration: none !important;
  }
`;

const Project = ({ project }) => (
  <Card to={`/p/${project.id}`}>
    <Title>{project.name}</Title>
    <Footer>{project.createdAt}</Footer>
  </Card>
);

export default () => {
  const { projects } = useStateValue();

  return (
    <Container>
      <H1>Your Projects</H1>

      <AddProject />

      <Grid>
        {projects.map(p => (
          <Project key={p.id} project={p} />
        ))}
      </Grid>
    </Container>
  );
};
