import React, { createContext, useContext, useEffect, useState } from 'react';
import { scenariosRef } from '../config/firebase';

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => {
  const [scenarios, setScenarios] = useState([]);

  useEffect(() => {
    const unsubscribe = () =>  scenariosRef.on("value", snapshot => {
      const result = snapshot.val()
      const value = Object.keys(result).map((key) => {
        return result[key];
      });
      setScenarios(value)
    })

    unsubscribe();
  }, []);

  const onAddScenario = (newScenario) => scenariosRef.push().set(newScenario);

  const context = {
    scenarios,
    onAddScenario
  }

  return (
    <StateContext.Provider value={context}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateValue = () => useContext(StateContext);