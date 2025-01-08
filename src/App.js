import React, { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);

 // Add task
  const addTask = () => {
      if(newTask.trim() !== ""){
      const newTaskItem = { id: uuidv4(), text: newTask }; 
      setTasks([...tasks, newTaskItem]);
      setNewTask("");
      }
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks((prev) =>  prev.filter((task) => task.id !== id)) ;
  };

  // Start editing task
  const editTask = (id, text) => {
    setEditId(id);
    setEditText(text);
  }

  // Save edited tasked
  const saveTask = () => { 
      const updatedTask = tasks.map((task) => task.id === editId ? {...task, text: editText} : task);
      setTasks(updatedTask);
      setEditId(null);
      setEditText("");
    
   
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List</h1>
        
        {editId === null  ?(<div className="input-container">
          <input
            type="text"
            placeholder="Add task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>): (<div className="input-container">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={saveTask}>Save</button>
        </div>)}
      
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id}>
              <span>{task.text}</span>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
              <button onClick={() => editTask(task.id,task.text)}>Edit</button>
            </li>
          ))}
        </ul>
        
      </header>
    </div>
  );
}

export default App;
