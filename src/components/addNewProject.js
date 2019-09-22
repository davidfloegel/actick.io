import React, { Fragment, useState } from "react";
import styled from "styled-components";
import Input from "./input";
import { useStateValue } from "../state/projects";

const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
`;
const AddStatusIcon = styled.i`
  margin-right: 15px;
`;

const AddNewItem = () => {
  const { onAddProject } = useStateValue();
  const [description, setDescription] = useState("");

  const onTriggerSave = () => {
    onAddProject(description);
    setDescription("");
  };

  const detectEnter = e => {
    if (e.which === 13 || e.keyCode === 13) {
      return onTriggerSave();
    }
  };

  const onUpdateDescription = e => setDescription(e.target.value);

  return (
    <Flex>
      <AddStatusIcon className="fa fa-plus-circle" />
      <Input
        placeholder="Add a new project"
        value={description}
        onChange={onUpdateDescription}
        onKeyPress={detectEnter}
      />
    </Flex>
  );
};

export default AddNewItem;
