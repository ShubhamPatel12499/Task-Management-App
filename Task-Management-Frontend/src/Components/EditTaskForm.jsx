import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../Styles/EditTaskForm.css";

const EditTaskForm = ({ taskId, onClose, onUpdate }) => {
  const [taskName, setTaskName] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');

  //Get the Data
  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`https://task-management-backend-5wrr.onrender.com/tasks/${taskId}`);
        const taskData = response.data;
        setTaskName(taskData.taskName);
        setStatus(taskData.status);
        setDate(taskData.date);
      } catch (error) {
        console.error('Error fetching task details:', error);
      }
    };

    fetchTaskDetails();
  }, [taskId]); 

  //Update the Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://task-management-backend-5wrr.onrender.com/tasks/updateTask/${taskId}`, {
        taskName,
        status,
        date
      });
      onUpdate();
      onClose();
      alert('Successfully Updated the Task!');
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to Updated the Task. Please try again.');
    }
  };

  return (
    <div className="edit-task-form">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="taskName">Task Name:</label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
            className="edit-task-input"
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="edit-task-input"
          >
            <option value="">Select Status</option>
            <option value="Tasks">Tasks</option>
            <option value="In-progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Rework">Rework</option>
          </select>
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="edit-task-input"
          />
        </div>
        <div className="button-container">
            <button type="submit" className="edit-task-button">Update Task</button>
            <button type="button" onClick={onClose} className="edit-task-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskForm;
