import _ from "lodash";
import React from "react";
import { useStateValue } from "../state";
import Section from "../components/section";
import CreateSection from "../components/newSection";

export default () => {
  const {
    sections,
    onUpdateSectionName,
    onAddScenario,
    onUpdateItem,
    onDeleteItem
  } = useStateValue();

  return (
    <React.Fragment>
      {_.map(sections, (scenarios, sectionName) => (
        <Section
          key={sectionName}
          scenarios={scenarios}
          sectionName={sectionName}
          onUpdateSectionName={onUpdateSectionName}
          onUpdateItem={onUpdateItem}
          onDeleteItem={onDeleteItem}
        />
      ))}

      <CreateSection onSave={v => onAddScenario("First Scenario...", v)} />
    </React.Fragment>
  );
};
