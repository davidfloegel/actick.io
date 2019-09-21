import _ from 'lodash'
import React from "react";
import { useStateValue } from '../state'
import Section from "../components/section";
import Button from '../components/button'

export default () => {
  const { sections, onAddScenario } = useStateValue()

  return (
    <React.Fragment>
      <Button onClick={() => onAddScenario()}>
        Create
      </Button>
      {_.map(sections, (scenarios, sectionName) => (
        <Section scenarios={scenarios} title={sectionName} />
      ))}
    </React.Fragment>
  );
  
}

