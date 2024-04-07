import React, { useState } from "react";
import axios from "axios";
import "../Styles/AddTaskPage.css";
import { useNavigate } from "react-router-dom";

const AddTaskPage = () => {
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //Post Req for Add the new Task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://task-management-backend-5wrr.onrender.com/tasks/addTask",
        {
          taskName,
          status,
          date,
        }
      );
      setTaskName("");
      setStatus("");
      setDate("");
      setError("");
      alert("Task added successfully!");
      navigate("/viewTask");
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
  };

  return (
    <div className="add-task-container">
      <h2>Add Task</h2>
      <form className="add-task-form" onSubmit={handleSubmit}>
        <label>
          Task Name:
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Status:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select Status</option>
            <option value="Tasks">Tasks</option>
            <option value="In-progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Rework">Rework</option>
          </select>
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Add Task</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default AddTaskPage;
