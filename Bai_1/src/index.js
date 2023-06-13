import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

function TaskForm({ onAddTask }) {
  const [taskName, setTaskName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const newTask = {
      id: Date.now(),
      name: taskName,
      done: false,
      dueDate: null
    };
    onAddTask(newTask);
    setTaskName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

function TaskList({ tasks, onToggleDone }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => onToggleDone(task.id)}
          />
          {task.name}
          {task.dueDate && (
            <span> - Due in {task.dueDate} days</span>
          )}
        </li>
      ))}
    </ul>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [showOnlyNotFinished, setShowOnlyNotFinished] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask(newTask) {
    setTasks([...tasks, newTask]);
  }

  function handleToggleDone(taskId) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, done: !task.done };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const filteredTasks = showOnlyNotFinished
    ? tasks.filter((task) => !task.done)
    : tasks;

  const numNotFinishedTasks = tasks.filter((task) => !task.done).length;

  return (
    <div>
      <TaskForm onAddTask={handleAddTask} />
      <label>
        <input
          type="checkbox"
          checked={showOnlyNotFinished}
          onChange={() => setShowOnlyNotFinished(!showOnlyNotFinished)}
        />
        Show only not finished tasks
      </label>
      <TaskList tasks={filteredTasks} onToggleDone={handleToggleDone} />
      <div>{numNotFinishedTasks} tasks not finished</div>
    </div>
  );
}



root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
