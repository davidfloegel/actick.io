import _ from "lodash";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useStateValue } from "../state";
import { useStateValue as useProjectsStateValue } from "../state/projects";
import Section from "../components/section";
import CreateSection from "../components/newSection";
import Spinner from "../components/spinner";

const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`;

export const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  margin: 0 0 25px 0;
`;

export default ({ match }) => {
  const { findProject, oneProject } = useProjectsStateValue();
  const {
    sections,
    loading,
    loadScenarios,
    onUpdateSectionName,
    onAddScenario,
    onUpdateItem,
    onDeleteItem
  } = useStateValue();

  useEffect(() => {
    findProject(match.params.id);
    loadScenarios(match.params.id);
  }, []);

  if (!oneProject) {
    return <Spinner />;
    return (
      <Container>
        <Title>Project Doesn't Exist</Title>
      </Container>
    );
  }

  return (
    <Container>
      <Title>{oneProject.name}</Title>

      {_.map(sections, (scenarios, sectionName) => (
        <Section
          key={sectionName}
          scenarios={scenarios}
          sectionName={sectionName}
          onUpdateSectionName={onUpdateSectionName}
          onUpdateItem={onUpdateItem}
          onDeleteItem={onDeleteItem}
          projectId={match.params.id}
        />
      ))}

      <CreateSection
        onSave={v => onAddScenario("First Scenario...", match.params.id, v)}
      />
    </Container>
  );
};
