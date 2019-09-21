import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import Input from './input';
import { useStateValue } from '../state'

const AddStatusIcon = styled.i`
  margin-right: 15px;
`;

const AddNewItem = ({ sectionName }) => {
  const { onAddScenario } = useStateValue()
  const [description, setDescription] = useState('');

  const onTriggerSave = () => {
    onAddScenario(description, sectionName)
    setDescription('')
  }

  const detectEnter = e => {
    if (e.which === 13 || e.keyCode === 13) {
      return onTriggerSave();
    }
  };

  const onUpdateDescription = e => setDescription(e.target.value)

  return (
    <Fragment>
      <AddStatusIcon className="fa fa-plus-circle" />
      <Input
        placeholder="Add a new item"
        value={description}
        onChange={onUpdateDescription}
        onKeyPress={detectEnter}
      />
    </Fragment>
  )
}

export default AddNewItem
