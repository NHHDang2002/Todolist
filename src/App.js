import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

 // Add task
  const addTask = () => {
      setTasks([...tasks, newTask]);
      setNewTask("");
  
  };

  // Delete task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_,i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Add task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index}>
              <span>{task}</span>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
