import _ from "lodash";
import React, { createContext, useContext, useEffect, useState } from "react";
import { scenariosRef } from "../config/firebase";

const STATUS = {
  1: "To do",
  2: "In Test",
  3: "Passed",
  4: "Failed",
  5: "Retest"
};

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => {
  const [data, setData] = useState();
  const [sections, setSections] = useState([]);
  const [totScenarios, setTotScenarios] = useState(0);

  useEffect(() => {
    const unsubscribe = () =>
      scenariosRef.on("value", snapshot => {
        const result = snapshot.val();

        if (result === null) {
          return null;
        }

        const value = Object.keys(result).map(key => {
          return result[key];
        });

        setTotScenarios(value.length);

        const sections = _.groupBy(value, "section");
        setSections(sections);
        setData(result);
      });

    unsubscribe();
  }, []);

  const onAddScenario = (description, sectionName) => {
    const newScenario = {
      id: `S${totScenarios + 1}`,
      status: 1,
      description,
      lastUpdated: new Date().toUTCString(),
      steps: "",
      testData: "",
      expectedOutcome: "",
      actualOutcome: "",
      section: sectionName,
      projectId: "1"
    };

    scenariosRef.push().set(newScenario);
  };

  const onUpdateSectionName = (oldSectionName, newSectionName) => {
    let update = {};
    _.forEach(data, (v, k) => {
      if (v.section === oldSectionName) {
        update[k] = {
          ...v,
          section: newSectionName
        };
      }
    });

    scenariosRef.update(update);
  };

  const onUpdateItem = (id, updateData) => {
    let update = {};
    _.forEach(data, (v, k) => {
      if (v.id === id) {
        update[k] = {
          ...v,
          ...updateData,
          lastUpdated: new Date().toUTCString()
        };
      }
    });

    scenariosRef.update(update);
  };

  const onDeleteItem = id => {
    let deleteMe = {};
    _.forEach(data, (v, k) => {
      if (v.id === id) {
        deleteMe = k;
      }
    });

    console.log(deleteMe);
    // scenariosRef.remove(deleteMe);
  };

  const context = {
    sections,
    onAddScenario,
    onUpdateSectionName,
    onUpdateItem,
    onDeleteItem
  };

  return (
    <StateContext.Provider value={context}>{children}</StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
