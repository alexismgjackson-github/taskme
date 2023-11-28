import React from "react";
import { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";

function TaskList() {
  const [taskInput, setTaskInput] = useState("");

  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  React.useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  const handleChange = (e) => {
    setTaskInput(e.target.value);
  };

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      task: taskInput,
    };
    setTaskList([...taskList, newTask]);
    setTaskInput("");
  };

  const deleteTask = (id) => {
    const newTaskList = taskList.filter((task) => task.id !== id);
    setTaskList(newTaskList);
  };

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
