import React, { useState } from 'react';
import './TaskPopup.css'; 


function TaskPopup({ onClose, onAddTask, image }) {
  const [taskName, setTaskName] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [taskPriority, setTaskPriority] = useState('');
 

  const handleAddTask = () => {
    if (taskName && taskStatus && taskPriority) {
      const newTask = {
        name: taskName,
        status: taskStatus,
        priority: taskPriority,
        createdDate: new Date().toLocaleString(),
      };
      onAddTask(newTask);
      onClose(); 
    
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <div className="popupoverlay">
      <div className="popupcontent">
        <div className="terminal">
        {image && (
          <div className="uploaded-image-preview">
            <img src={image} alt="Uploaded" className="task-uploaded-image" />
          </div>
          )}
          <div className="tfi">
        <h2>Add New Task</h2>
        <span className="closeee" onClick={onClose}>&times;</span>
        </div>
      </div>
        <div className="task-form">
          <div className="go">
          <label>Task Name</label>
          <div className="option1">
          <input
            type="text"
            placeholder="Enter Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          </div>
</div>
<div className="go1">
          <label>Task Status</label>
          <div className="optionn">
          <select value={taskStatus}  onChange={(e) => setTaskStatus(e.target.value)}>
            <option value="" >Select Status</option>
            <option value="Yet to start">Yet to start</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          </div>
          <div className="pop">
          <label>Task Priority</label>
          <div className="optionn">
          <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)}>
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          </div>
          </div>
        </div>
        </div>
        <div className="popup-buttons">
          <button className="add-button" onClick={handleAddTask}>Add New Task</button>
          <button className="discardbutton" onClick={onClose}>Discard</button>
        </div>
      </div>
    </div>
  );
}

export default TaskPopup;
