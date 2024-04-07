import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import "../Styles/ViewTaskPage.css";
import EditTaskForm from '../Components/EditTaskForm';

const ViewTaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchData(startDate, endDate);
  }, [startDate, endDate]);

  //Get the data 
  const fetchData = async (startDate, endDate) => {
    try {
      const response = await axios.get('https://task-management-backend-5wrr.onrender.com/tasks/getTasks', {
        params: {
          startDate,
          endDate
        }
      });
      const sortedTasks = response.data.sort((a, b) => a.order - b.order);
      setTasks(sortedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  //Drag and Drop the Task
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const updatedTasks = [...tasks];
    const draggedTask = updatedTasks[source.index];

    draggedTask.status = destination.droppableId;
    updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, draggedTask);

    updatedTasks.forEach((task, index) => {
      task.order = index;
    });

    setTasks(updatedTasks);

    try {
      await axios.patch(`https://task-management-backend-5wrr.onrender.com/tasks/updateStatus/${draggedTask._id}`, { status: draggedTask.status });
      fetchData(startDate, endDate);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  //For Download Pdf as per the status of the task
  const handleDownload = async (taskStatus) => {
    try {
      const response = await axios.get(`https://task-management-backend-5wrr.onrender.com/tasks/download/${taskStatus}`, {
        responseType: 'blob'
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${taskStatus}_tasks.pdf`);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  //For Update the Task
  const handleEditTask = async (taskId) => {
    try {
      const response = await axios.get(`https://task-management-backend-5wrr.onrender.com/tasks/${taskId}`);
      const taskData = response.data;
      setEditingTask(taskData);
      console.log('Editing task:', taskData);
    } catch (error) {
      console.error('Error fetching task details for editing:', error);
    }
  };

  //For Delete the Task
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`https://task-management-backend-5wrr.onrender.com/tasks/delete/${taskId}`);
      fetchData(startDate, endDate);
      console.log('Task deleted successfully');
      alert('Task Deleted Successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete the Task. Please try again.');
    }
  };

  //For Update the Task
  const handleUpdateTaskList = () => {
    fetchData(startDate, endDate);
    setEditingTask(null);
  };

  //Drag and Drop with React-dnd
  const TaskItem = ({ task, index }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "task",
      item: { id: task._id, index },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging()
      })
    }));

    return (
      <div ref={drag} className="task-item" style={{ opacity: isDragging ? 0.5 : 1 }}>
        <p>{task.taskName}</p>
        <p>Status: {task.status}</p>
        <p>Date: {task.date}</p>
        <button onClick={() => handleEditTask(task._id)}>Edit</button>
        <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
      </div>
    );
  };

  const Column = ({ status }) => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: "task",
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
      drop: async (item) => {
        try {
          const { id: taskId } = item;
          const response = await axios.patch(
            `https://task-management-backend-5wrr.onrender.com/tasks/updateStatus/${taskId}`,
            { status }
          );
          console.log(response.data);
          fetchData(startDate, endDate);
        } catch (error) {
          console.error('Error updating task status:', error);
        }
      }
    }));

    const columnClasses = isOver ? 'column drag-over' : 'column';

    return (
      <div ref={drop} className={columnClasses}>
        <h3>{status}</h3>
        {tasks
          .filter((task) => task.status === status)
          .map((task, idx) => (
            <TaskItem key={task._id} task={task} index={idx} />
          ))}
        <button onClick={() => handleDownload(status)}>Download {status} tasks PDF</button>
      </div>
    );
  };

  return (
    <div className="view-task-container">
      <h2>All Tasks</h2>
      {editingTask && (
        <EditTaskForm
          taskId={editingTask._id}
          onClose={() => setEditingTask(null)}
          onUpdate={handleUpdateTaskList}
        />
      )}
      <div className="date-input-container">
        <label htmlFor="start-date">Start Date:</label>
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="date-input-container">
        <label htmlFor="end-date">End Date:</label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <DndProvider backend={HTML5Backend} onDragEnd={handleDragEnd}>
        <div className="view-board">
          {['Tasks', 'In-progress', 'Done', 'Rework'].map((status, index) => (
            <Column key={status} status={status} />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default ViewTaskPage;

