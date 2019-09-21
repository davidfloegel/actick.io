import React from 'react'
import { useStateValue } from './state'

const ScenariosList = () => {
  const { scenarios } = useStateValue()

  return (
    <ul>
      {scenarios.map(scenario => (
        <li>
          {scenario.id} - {scenario.description}
        </li>
      ))}
    </ul>
  )
}

export default ScenariosList;
