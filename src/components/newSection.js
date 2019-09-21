import React, { useState } from "react";
import styled from "styled-components";
import Input from "./input";

const New = styled.div`
  margin: 25px 0 50px 0;
`;

export default ({ onSave }) => {
  const [name, setName] = useState("");

  const onTriggerSave = () => {
    onSave(name);
    setName("");
  };

  const detectEnter = e => {
    if (e.which === 13 || e.keyCode === 13) {
      return onTriggerSave();
    }
  };

  const onUpdatename = e => setName(e.target.value);
  return (
    <New>
      <Input
        placeholder="Create a new section"
        value={name}
        onChange={onUpdatename}
        onKeyPress={detectEnter}
      />
    </New>
  );
};
