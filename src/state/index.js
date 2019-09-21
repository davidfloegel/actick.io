import _ from "lodash";
import React, { createContext, useContext, useEffect, useState } from "react";
import { scenariosRef } from "../config/firebase";

<<<<<<< HEAD
=======
export const StateContext = createContext();

// const newSection = {
//   title: 'Amazing',
//   description: '',
//   items: [
//     { title}
//   ],
// }

>>>>>>> 31b28a9007a13edb694e3026563acc80f5b01aa8
const STATUS = {
  1: "To do",
  2: "In Test",
  3: "Passed",
  4: "Failed",
  5: "Retest"
};

<<<<<<< HEAD
export const StateContext = createContext();
=======
const newScenario = {
  id: "S1",
  status: 1,
  description: "Description",
  lastUpdated: new Date().toUTCString(),
  steps: "Free text",
  testData: "Free text test data",
  expectedOutcome: "beautiful",
  actualOutcome: "awful",
  section: "Amazing Section",
  projectId: "2"
};
>>>>>>> 31b28a9007a13edb694e3026563acc80f5b01aa8


export const StateProvider = ({ reducer, initialState, children }) => {
  const [sections, setSections] = useState([]);
  const [totScenarios, setTotScenarios] = useState(0);

  useEffect(() => {
    const unsubscribe = () => scenariosRef.on("value", snapshot => {
      const result = snapshot.val();

      if (result === null) {
        return null;
      }

      const value = Object.keys(result).map(key => {
        return result[key];
      });

      setTotScenarios(value.length);

      const sections = _.groupBy(value, 'section')
      setSections(sections)
    })

    unsubscribe();
  }, []);

  const onAddScenario = (description, sectionName) => {
    const newScenario = {
      id: `S${totScenarios + 1}`,
      status: 1,
      description,
      lastUpdated: (new Date()).toUTCString(),
      steps: '',
      testData: '',
      expectedOutcome: '',
      actualOutcome: '',
      section: sectionName,
      projectId: '1',
    }

    scenariosRef.push().set(newScenario);
  }
  

  const context = {
    sections,
    onAddScenario
  };

  return (
    <StateContext.Provider value={context}>{children}</StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
