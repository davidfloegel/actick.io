import React, { useEffect, useState, useRef } from "react";

import Input from "./input";

export default ({ value, children }) => {
  const [editMode, setEditMode] = useState(false);
  const inputEl = useRef(null);

  useEffect(
    () => {
      if (inputEl.current) {
        inputEl.current.focus();
      }
    },
    [editMode]
  );

  if (!editMode) {
    return <div onClick={() => setEditMode(true)}>{children}</div>;
  }

  return <Input ref={inputEl} value={value} />;
};
