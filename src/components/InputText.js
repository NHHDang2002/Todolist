import React from 'react';
import { Button, Input } from 'antd';
export default function InputText({ newText, setNewText, addTask, saveTask, editId }) {
  const resultInput = editId === null;
  const handleButtonOnClick = resultInput ? addTask : saveTask;
  const handleButtonText = resultInput ? 'Add' : 'Save';

  return (
    <div className="input-container">
      <Input type="text" value={newText} onChange={(e) => setNewText(e.target.value)} />
      <Button type="primary" onClick={handleButtonOnClick}>
        {handleButtonText}
      </Button>
    </div>
  );
}
