import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; 
import "../Styles/ViewTaskPage.css";

const ViewTaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchData(startDate, endDate);
 }, [startDate, endDate]);


  const fetchData = async (startDate, endDate) => {
    try {
        const response = await axios.get('http://localhost:8080/tasks/getTasks', {
            params: {
                startDate,
                endDate
            }
        });
        setTasks(response.data);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
  };

  const handleDragEnd = async result => {
    if (!result.destination) return;
  
    const { source, destination } = result;
    const updatedTasks = [...tasks];
    const draggedTask = updatedTasks[source.index];
    draggedTask.status = destination.droppableId;
    updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, draggedTask);
    setTasks(updatedTasks);
    try {
      await axios.patch(`http://localhost:8080/tasks/updateStatus/${draggedTask._id}`, { status: draggedTask.status });
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDownload = async (taskStatus) => {
    try {
      const response = await axios.get(`http://localhost:8080/tasks/download/${taskStatus}`, {
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
  
  return (
    <div className="view-task-container">
      <h2>All Tasks</h2>
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

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="view-board">
          {['Tasks', 'In-progress', 'Done', 'Rework'].map((status, index) => (
            <Droppable droppableId={status} key={status}>
              {(provided, snapshot) => (
                <div
                  className="column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3>{status}</h3>
                  {tasks
                    .filter(task => task.status === status)
                    .map((task, idx) => (
                      <Draggable draggableId={task._id} index={idx} key={task._id}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="task-item"
                          >
                            <p>{task.taskName}</p>
                            <p>Status: {task.status}</p>
                            <p>Date: {task.date}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                  <button onClick={() => handleDownload(status)}>Download {status} tasks PDF</button>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default ViewTaskPage;
