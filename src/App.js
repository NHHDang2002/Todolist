import React, { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);

  // Search string
  const [newSearch, setNewSearch] = useState("");
  // Search result
  const [searchResults, setSearchResults] = useState([]);

  const [dropDown, setDropDown] = useState(null);
 // Add task
  const addTask = () => {
      if(newTask.trim() !== ""){
      const newTaskItem = { id: uuidv4(), text: newTask, status: "Not Done" }; 
      setTasks([...tasks, newTaskItem]);
      setNewTask("");
      setSearchResults([]);
      }
  };



  // Delete task
  const deleteTask = (id) => {
    setTasks((prev) =>  prev.filter((task) => task.id !== id)) ;
    setSearchResults([]);
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
      setSearchResults([]);
  }

  // Set status task

  const setStatusTask = (id, newStatus) => {
    const updatedStatus = tasks.map((task) => task.id === id ? {...task, status: newStatus} : task)
    setTasks(updatedStatus);
    setDropDown(null);
  }
  // Dropdown and choose status
  const dropDownStatus = (id) => {
    setDropDown(dropDown === id ? null : id);
  }

  // Search
  const getSearchResult = () => {
    const searchTask  = tasks.filter((task) => task.text.toLowerCase().includes(newSearch.toLowerCase()));
    setSearchResults(searchTask);
  }

  // Search by status
  const getSearchStatusResult = () => {
    const searchStatusTask = tasks.filter((task) => task.status.toLowerCase().includes(newSearch.toLowerCase()));
    setSearchResults(searchStatusTask);
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

        <div className="input-container">
        <input
            type="text"
            placeholder="Search..."
            value={newSearch}
            onChange={(e) => setNewSearch(e.target.value)}
          />
          <button onClick={getSearchResult}>Search</button>
          <button onClick={getSearchStatusResult}>Search By Status</button>
        </div>
      

       <ul className="task-list">
  {newSearch.trim() ? ( //search results
    searchResults.length > 0 ? ( 
      searchResults.map((task) => (
        <li key={task.id}>
          <span>{task.text}</span>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
          <button onClick={() => editTask(task.id, task.text)}>Edit</button>
          <button onClick={() => dropDownStatus(task.id)}>
            {task.status}
          </button>

          {dropDown === task.id && (
            <div className="status-dropdown">
              <button onClick={() => setStatusTask(task.id, "Not done")}>
                Not Done
              </button>
              <button onClick={() => setStatusTask(task.id, "On going")}>
                On Going
              </button>
              <button onClick={() => setStatusTask(task.id, "Done")}>
                Done
              </button>
            </div>
          )}
        </li>
      ))
    ) : (
      <p>NOT FOUND</p> 
    )
  ) : (
    tasks.map((task) => ( // all task
      <li key={task.id}>
        <span>{task.text}</span>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
        <button onClick={() => editTask(task.id, task.text)}>Edit</button>
        <button onClick={() => dropDownStatus(task.id)}>
          {task.status}
        </button>

        {dropDown === task.id && (
          <div className="status-dropdown">
            <button onClick={() => setStatusTask(task.id, "Not done")}>
              Not Done
            </button>
            <button onClick={() => setStatusTask(task.id, "On going")}>
              On Going
            </button>
            <button onClick={() => setStatusTask(task.id, "Done")}>
                Done
            </button>
          </div>
        )}
      </li>
    ))
  )}
</ul>

      </header>
    </div>
  );
}

export default App;


// Thêm một state để lưu danh sách kết quả tìm kiếm (searchResults).
// Khi người dùng nhấn nút Search, thực hiện lọc danh sách và lưu kết quả vào searchResults.
// Hiển thị searchResults thay vì lọc trực tiếp trên tasks mỗi lần render.