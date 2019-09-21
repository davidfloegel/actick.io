import _ from 'lodash'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { scenariosRef } from '../config/firebase';

export const StateContext = createContext();


// const newSection = {
//   title: 'Amazing',
//   description: '',
//   items: [
//     { title}
//   ],
// }

const STATUS = {
  1: 'To do',
  2: 'In Test',
  3: 'Passed',
  4: 'Failed',
  5: 'Retest',
}

const newScenario = {
  id: 'S1',
  status: STATUS[1],
  description: 'Description',
  lastUpdated: new Date(),
  steps: 'Free text',
  testData: 'Free text test data',
  expectedOutcome: 'beautiful',
  actualOutcome: 'awful',
  section: 'Amazing Section',
  projectId: '2',
}

// _.groupBy(items, 'section')

export const StateProvider = ({ reducer, initialState, children }) => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const unsubscribe = () =>  scenariosRef.on("value", snapshot => {
      const result = snapshot.val()
      console.log(result)

      if (result === null) {
        return null;
      }

      const value = Object.keys(result).map((key) => {
        return result[key];
      });

      const sections = _.groupBy(value, 'section')

      console.log(sections)

      setSections(sections)
    })

    unsubscribe();
  }, []);

  const onAddScenario = () => scenariosRef.push().set(newScenario);

  const context = {
    sections,
    onAddScenario
  }

  return (
    <StateContext.Provider value={context}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateValue = () => useContext(StateContext);