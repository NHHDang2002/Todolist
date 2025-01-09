import React, { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const statusOptions = ["Not Done", "Running", "Done"];
  const [tasks, setTasks] = useState([]);
  const [newText, setNewText] = useState("");
  const [editId, setEditId] = useState(null);

  // Search string
  const [newSearch, setNewSearch] = useState("");
  // Search result
  const [searchResults, setSearchResults] = useState([]);

  const [dropDown, setDropDown] = useState(null);
 // Add task
  const addTask = () => {
      if(newText.trim() !== ""){
      const newTaskItem = { id: uuidv4(), text: newText, status: statusOptions[0]}; 
      setTasks([...tasks, newTaskItem]);
      setNewText("");
      setSearchResults([]);
      }
  };
  // Delete task
  const deleteTask = (id) => {
    setTasks((prev) =>  prev.filter((task) => task.id !== id)) ;
    setSearchResults([]);
  };

 // Start editing task
  const editTask = (id) => {
    const editedTask = tasks.find((task) => task.id === id);
    if(editedTask){
      setEditId(id);
      setNewText(editedTask.text);
    }
  }
  
  
  const saveTask = () => { 
      const updatedTask = tasks.map((task) => {
        if(task.id === editId){
          return {...task, text: newText}
        }
        else {
          return task;
        }
      });
      setTasks(updatedTask);
      setEditId(null);
      setNewText("");
      setSearchResults([]);
  }

  //Set status task
  const setStatusTask = (id, newStatus) => {
    const updatedStatus = tasks.map((task) => {
      if(task.id ===id){
      
        return {...task, status: newStatus};
      }
      else {
        return task;
      }
    })
    setTasks(updatedStatus);
    setDropDown(null);
  }

  // Dropdown and choose status
  const dropDownStatus = (id) => {
    if(dropDown === id){
      setDropDown(null);
    }
    else{
      setDropDown(id);
    }
  }

  //Search
  const getSearchResult = () => {
    const searchTask = tasks.filter((task) => task.text.toLowerCase().includes(newSearch.toLowerCase()));
    setSearchResults(searchTask);
  }

  const getSearchStatusResult = () => {
    const searchTask = tasks.filter((task) => task.status.toLowerCase().includes(newSearch.toLowerCase()));
    setSearchResults(searchTask);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List</h1>
        
        {editId === null  ?(<div className="input-container">
          <input
            type="text"
            placeholder="Add task..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>): (<div className="input-container">
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
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
  {newSearch.trim() ? ( 
    searchResults.length > 0 ? ( 
      searchResults.map((task) => (
        <li key={task.id}>
          <div className="roh">
          <span>{task.text}</span>
          </div>
         <div className="custom">
          <button onClick={() => deleteTask(task.id)}>Delete</button>
          <button onClick={() => editTask(task.id)}>Edit</button>
          <button onClick={() => dropDownStatus(task.id)}>
            {task.status}
          </button>
         </div>

          {dropDown === task.id && (
            <div className="dropdown-menu">
            {statusOptions.map((statusOption, index) => (
              <button 
                key={index} 
                onClick={() => setStatusTask(task.id, statusOption)}
              >
                {statusOption}
              </button>
            ))}
          </div>
          )}
        </li>
      ))
    ) : (
      <p>NOT FOUND</p> 
    )
  ) : (
    tasks.map((task) => (
      <li key={task.id}>
        <span>{task.text}</span>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
        <button onClick={() => editTask(task.id)}>Edit</button>
        <button onClick={() => dropDownStatus(task.id)}>
          {task.status}
        </button>

        {dropDown === task.id && (
         <div className="dropdown-menu">
         {statusOptions.map((statusOption, index) => (
           <button 
             key={index} 
             onClick={() => setStatusTask(task.id, statusOption)}
           >
             {statusOption}
           </button>
         ))}
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





