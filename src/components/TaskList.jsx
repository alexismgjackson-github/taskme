import React from "react";
import { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";

function TaskList() {
  const [taskInput, setTaskInput] = useState("");

  // Save task to the localStorage
  React.useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  const handleChange = (e) => {
    setTaskInput(e.target.value);
  };

  // Get task from the localStorage
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  // Add task to tasklist in descending order with unique ID
  const addTask = () => {
    const newTask = {
      id: Date.now(),
      task: taskInput,
    };
    setTaskList([...taskList, newTask]);
    setTaskInput("");
  };

  // Delete task from tasklist via unique ID
  const deleteTask = (id) => {
    const newTaskList = taskList.filter((task) => task.id !== id);
    setTaskList(newTaskList);
  };

  // Toggle "completed" styling on task in tasklist
  const toggleCompleted = (id) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <section className="tasklist">
      <form className="tasklist--field">
        <input
          className="tasklist--input"
          type="text"
          name="taskInput"
          placeholder="Enter a task here..."
          value={taskInput}
          onChange={handleChange}
        />
        <button
          className="add-task--btn"
          onClick={addTask}
          disabled={!taskInput}
        >
          Add Task
        </button>
      </form>

      <ul className="tasklist--list">
        {taskList?.length > 0 ? (
          taskList.map((task) => (
            <div className="tasklist--item" key={task.id}>
              <li
                className={`task ${task.completed ? "completed" : ""}`}
                onClick={() => toggleCompleted(task.id)}
              >
                {task.task}
              </li>
              <button
                className="delete--btn"
                onClick={() => deleteTask(task.id)}
              >
                <BsFillTrashFill alt="Delete task"></BsFillTrashFill>
              </button>
            </div>
          ))
        ) : (
          <div className="tasklist--empty">
            <p>No task found here...</p>
          </div>
        )}
      </ul>
    </section>
  );
}

export default TaskList;
