import React from 'react';
import statusOptions from '../constants/StatusOptions';

export default function TaskList({
  tasks,
  dropDown,
  newSearch,
  setStatusTask,
  deleteTask,
  editTask,
  dropDownStatus,
}) {
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
    let dropdownMenu = null;
    if (dropDown === task.id) {
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
      );
    }

    return (
      <li key={task.id}>
        <div className="roh">
          <span>{task.text}</span>
        </div>
        <div className="custom">
          <button onClick={() => deleteTask(task.id)}>Delete</button>
          <button onClick={() => editTask(task.id)}>Edit</button>
          <button onClick={() => dropDownStatus(task.id)}>{task.status}</button>
        </div>
        {dropdownMenu}
      </li>
    );
  });

  return <ul className="task-list">{tasksToRenderList}</ul>;
}
