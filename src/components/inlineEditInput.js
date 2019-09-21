import React, { useEffect, useState, useRef } from "react";

import Input from "./input";

export default ({ value, children, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [newValue, setNewValue] = useState(value);
  const inputEl = useRef(null);

  useEffect(
    () => {
      if (inputEl.current) {
        inputEl.current.focus();
      }
    },
    [editMode]
  );

  const detectEnter = e => {
    if (e.which === 13 || e.keyCode === 13) {
      return onTriggerSave();
    }
  };

  const change = e => {
    return setNewValue(e.target.value);
  };

  const onTriggerSave = () => {
    if (newValue) {
      onSave(newValue);
      setEditMode(false);
      return;
    }

    return;
  };

  if (!editMode) {
    return <div onClick={() => setEditMode(true)}>{children}</div>;
  }

  return (
    <Input
      ref={inputEl}
      value={newValue}
      onKeyPress={detectEnter}
      onChange={change}
      onBlur={onTriggerSave}
    />
  );
};
