import React, { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import Search from './components/Search';
import TaskList from './components/TaskList';
import statusOptions from './constants/StatusOptions';
import InputText from './components/InputText';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newText, setNewText] = useState('');
  const [editId, setEditId] = useState(null);
  const [newSearch, setNewSearch] = useState(''); // Search string

  // Add task
  const addTask = () => {
    if (newText.trim() !== '') {
      const newTaskItem = {
        id: uuidv4(),
        text: newText,
        status: statusOptions[0].content,
      };
      setTasks([...tasks, newTaskItem]);
      setNewText('');
    }
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Start editing task
  const editTask = (id) => {
    const editedTask = tasks.find((task) => task.id === id);
    if (editedTask) {
      setEditId(id);
      setNewText(editedTask.text);
    }
  };

  // Save task
  const saveTask = () => {
    const updatedTask = tasks.map((task) => {
      if (task.id === editId) {
        return { ...task, text: newText };
      } else {
        return task;
      }
    });
    setTasks(updatedTask);
    setEditId(null);
    setNewText('');
  };

  //Set status task
  const setStatusTask = (id, newStatus) => {
    const updatedStatus = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedStatus);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>To Do List</h1>
        <InputText
          newText={newText}
          setNewText={setNewText}
          editId={editId}
          addTask={addTask}
          saveTask={saveTask}
        />
        <Search newSearch={newSearch} setNewSearch={setNewSearch} />
        <TaskList
          tasks={tasks}
          setStatusTask={setStatusTask}
          deleteTask={deleteTask}
          editTask={editTask}
          newSearch={newSearch}
        />
      </header>
    </div>
  );
}

export default App;
