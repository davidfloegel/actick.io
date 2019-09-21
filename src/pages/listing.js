import _ from 'lodash'
import React from "react";
import { useStateValue } from '../state'
import Section from "../components/section";

export default () => {
  const { sections,  } = useStateValue()

  return (
    <React.Fragment>
      {_.map(sections, (scenarios, sectionName) => (
        <Section scenarios={scenarios} sectionName={sectionName} />
      ))}
    </React.Fragment>
  );
  
}

