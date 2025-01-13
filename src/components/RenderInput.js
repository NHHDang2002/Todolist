import React from "react";

export default function RenderInput({newText, setNewText, addTask, saveTask, editId}) {
  const resultInput = editId === null;
  const handleButtonOnClick = resultInput ? addTask : saveTask;
  const handleButtonText = resultInput ? "Add" : "Save";
  return(
    <div className="input-container">
    <input
    type="text"
    value={newText}
    onChange={(e) => setNewText(e.target.value)}
   />
    <button onClick={handleButtonOnClick}>{handleButtonText}</button>
  </div>
  )
}
