import React, { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import RenderInput from "./components/RenderInput";
import RenderSearch from "./components/RenderSearch";





const statusOptions = [
  {id: 0, content: "No"},
  {id: 1, content: "Running"},
  {id: 2, content: "Done"},
];

function App() {
  
  const [tasks, setTasks] = useState([]);
  const [newText, setNewText] = useState("");
  const [editId, setEditId] = useState(null);
  const [newSearch, setNewSearch] = useState(""); // Search string
  const [searchResults, setSearchResults] = useState([]); // Search result
  const [dropDown, setDropDown] = useState(null);
  
 // Add task
  const addTask = () => {
      if(newText.trim() !== ""){
      const newTaskItem = { id: uuidv4(), text: newText, status: statusOptions[0].content}; 
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
      return task;
    })
    setTasks(updatedStatus);
    setDropDown(null);
  }

  // Dropdown and choose status
  const dropDownStatus = (id) => {
    if(dropDown === id){
      setDropDown(null);
    }
      setDropDown(id);
  }
 // SaveAddButton
  // const RenderInput = ({newText, setNewText, addTask, saveTask, editId}) => {
  //   const resultInput = editId === null;
  //   const handleButtonOnClick = resultInput ? addTask : saveTask;
  //   const handleButtonText = resultInput ? "Add" : "Save";
  //   return(
  //     <div className="input-container">
  //     <input
  //     type="text"
  //     value={newText}
  //     onChange={(e) => setNewText(e.target.value)}
  //    />
  //     <button onClick={handleButtonOnClick}>{handleButtonText}</button>
  //   </div>
  //   )
  // }

  // const RenderSearch = ({newSearch, setNewSearch}) => {
  //   return (
  //     <div className="input-container">
  //       <input
  //         type="text"
  //         placeholder="Search by text or status..."
  //         value={newSearch}
  //         onChange={(e) => setNewSearch(e.target.value)}
  //       />
  //     </div>
  //   );
  // };
  

  const RenderTaskList = ({tasks, dropDown, newSearch, setStatusTask, deleteTask, editTask}) => {
    const tasksToRender = tasks.filter((task) => {
      const searchLower = newSearch.toLowerCase();
      return (
        task.text.toLowerCase().includes(searchLower) || 
        task.status.toLowerCase().includes(searchLower)
      );
    });
  
    if (tasksToRender.length === 0) {
      return <p>NOT FOUND</p>;
    }

    const tasksToRenderList = tasksToRender.map((task) => {
      let dropdownMenu =null;
            if(dropDown === task.id){
              dropdownMenu = (
                <div className="dropdown-menu">
                  {statusOptions.map((statusOption) => (
                    <button
                      key={statusOption.id}
                      onClick={() => setStatusTask(task.id, statusOption.content)}
                    >
                      {statusOption.content}
                    </button>
                  ))}
                </div>
              )
            } 

          return (
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
              {dropdownMenu}
            </li>
          );
    })
  
    return (
      <ul className="task-list">
        {tasksToRenderList}
      </ul>
    );
  };
  
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>To Do List</h1>
        <RenderInput
          newText={newText}
          setNewText={setNewText}
          editId={editId}
          addTask={addTask}
          saveTask={saveTask}/>
        <RenderSearch 
          newSearch = {newSearch} 
          setNewSearch={setNewSearch}/>
        <RenderTaskList
          tasks={tasks}
          dropDown={dropDown}
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








