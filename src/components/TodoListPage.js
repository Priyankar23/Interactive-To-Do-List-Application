import React, { useState, useEffect, useRef } from 'react';
import './TodoListPage.css';
import TaskPopup from './TaskPopup';
import TodoPopup from './TodoPopup';
import Tree from './Tree.jpg';
import Avatar from './Avatar.png';
import { useLocation } from 'react-router-dom';
import Rename from './Rename.png';
import Delete from './Delete.png';
import Vector from './Vector.png';
import Icon from './Icon.png';

function TodoListPage() {
  const [tasks, setTasks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskMenuFor, setShowTaskMenuFor] = useState(null); 

  const [showRenamePopup, setShowRenamePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const location = useLocation();
  const { image, name } = location.state || {};
  const [editingStatusTask, setEditingStatusTask] = useState(null);
  const [editingPriorityTask, setEditingPriorityTask] = useState(null);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [expandedTasks, setExpandedTasks] = useState({});
  const [selectedTodoList, setSelectedTodoList] = useState(null);
  const [todoLists, setTodoLists] = useState([]);
  const [currentTodoList, setCurrentTodoList] = useState(null);
  const taskMenuRef = useRef(null);
  const avatarMenuRef = useRef(null
  );
  // useEffect(() => {

  //   if (name&& image) {

  //     const listExists = todoLists.some((list) => list.name === name);
  //     if (!listExists && !currentTodoList) {
  //       const newTodoList = {name, image, tasks: [] };
  //       setTodoLists((prev) => [...prev, newTodoList]);
  //       setCurrentTodoList(newTodoList);
  //     } else if (listExists && !currentTodoList) {
  //       const existingTodoList = todoLists.find((list) => list.name === name);
  //       setCurrentTodoList(existingTodoList);
  //     }
  //   }
  // }, [name, image]);

  useEffect(() => {

    if (name && image && !currentTodoList) {
     
      const listExists = todoLists.some((list) => list.name === name);

      
      if (!listExists) {
        const newTodoList = { name, image, tasks: [] };
        setTodoLists(() => [ newTodoList]);
        setCurrentTodoList(newTodoList);
      } else {
       
        const existingTodoList = todoLists.find((list) => list.name === name);
        setCurrentTodoList(existingTodoList);
      }

    }
  }, [name, image, todoLists, currentTodoList]);



  const handleSelectTodoList = (list) => {
    setCurrentTodoList(list);
  };
  const handleClickOutside = (event) => {
    if (taskMenuRef.current && !taskMenuRef.current.contains(event.target)) {
      setShowTaskMenuFor(false);
    }
    if (avatarMenuRef.current && !avatarMenuRef.current.contains(event.target)) {
      setShowAvatarMenu(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleTask = (task) => {
    setExpandedTasks((prev) => ({
      ...prev,
      [task.name]: !prev[task.name],
    }));
  };

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    setCurrentDate(today);
  }, []);

  const handleAddTask = (newTask) => {
    if (currentTodoList) {
      const updatedTodoLists = todoLists.map((list) =>
        list === currentTodoList
          ? {
            ...list,
            tasks: [...list.tasks, newTask],
          }
          : list
      );
      setTodoLists(updatedTodoLists);

      const updatedCurrentTodoList = updatedTodoLists.find(
        (list) => list.name === currentTodoList.name
      );
      setCurrentTodoList(updatedCurrentTodoList);

      setShowPopup(false);
    } else {
      alert("Please select a to-do list before adding a task.");
    }
  };


  const handleAvatarClick = (task) => {
    if (selectedTask === task && showTaskMenuFor === task.name) {
      setShowTaskMenuFor(null); 
    } else {
      setSelectedTask(task);
      setShowTaskMenuFor(task.name); 
    }
  };
  

  const handleRenameTask = () => {
    setNewTaskName(selectedTask.name);
    setShowRenamePopup(true);
    setShowTaskMenuFor(false);
  };

  const handleUpdateTaskName = () => {
    if (currentTodoList) {
      const updatedTasks = currentTodoList.tasks.map((task) =>
        task === selectedTask ? { ...task, name: newTaskName } : task
      );
      const updatedCurrentTodoList = { ...currentTodoList, tasks: updatedTasks };
      const updatedTodoLists = todoLists.map((list) =>
        list.name === currentTodoList.name ? updatedCurrentTodoList : list
      );

      setCurrentTodoList(updatedCurrentTodoList);
      setTodoLists(updatedTodoLists);
      setShowRenamePopup(false);
    }
  };


  const handleDeleteTask = () => {
    setShowDeletePopup(true);
    setShowTaskMenuFor(false);
  };

  const handleConfirmDelete = () => {
    if (currentTodoList) {
      const updatedTasks = currentTodoList.tasks.filter((task) => task !== selectedTask);
      const updatedCurrentTodoList = { ...currentTodoList, tasks: updatedTasks };
      const updatedTodoLists = todoLists.map((list) =>
        list.name === currentTodoList.name ? updatedCurrentTodoList : list
      );

      setCurrentTodoList(updatedCurrentTodoList);
      setTodoLists(updatedTodoLists);
      setShowDeletePopup(false);
    }
  };
  const handleSaveEditedTodoList = (newName, newImage) => {
    if (currentTodoList) {
      const updatedCurrentTodoList = { ...currentTodoList, name: newName, image: newImage };
      setCurrentTodoList(updatedCurrentTodoList);
      const updatedTodoLists = todoLists.map((list) =>
        list.name === currentTodoList.name ? updatedCurrentTodoList : list
      );
      setTodoLists(updatedTodoLists);

      setShowEditPopup(false);
    }
  };


  const handleAvatarrClick = () => {
    setShowAvatarMenu(!showAvatarMenu);
  };

  const handleEditTodoList = () => {
    setShowEditPopup(true);
    setShowAvatarMenu(false);
  };

  const handleDeleteTodoList = () => {
    setSelectedTodoList(currentTodoList);
    setShowDeletePopup(true);
    setShowAvatarMenu(false);
  };


  const handleConfirmTodoListDelete = () => {
    if (selectedTodoList) {
      const updatedTodoLists = todoLists.filter((list) => list !== selectedTodoList);
      setTodoLists(updatedTodoLists);


      if (selectedTodoList === currentTodoList) {
        setCurrentTodoList(null);
      }


      setShowDeletePopup(false);
      setSelectedTodoList(null);
    }
  };

  const handleStatusChange = (task, newStatus) => {
    if (currentTodoList) {
      const updatedTasks = currentTodoList.tasks.map((t) =>
        t.name === task.name ? { ...t, status: newStatus } : t
      );
      const updatedCurrentTodoList = { ...currentTodoList, tasks: updatedTasks };
      const updatedTodoLists = todoLists.map((list) =>
        list.name === currentTodoList.name ? updatedCurrentTodoList : list
      );
      setCurrentTodoList(updatedCurrentTodoList);
      setTodoLists(updatedTodoLists);
      setEditingStatusTask(null);
    }
  };


  const handlePriorityChange = (task, newPriority) => {
    if (currentTodoList) {
      const updatedTasks = currentTodoList.tasks.map((t) =>
        t.name === task.name ? { ...t, priority: newPriority } : t
      );
      const updatedCurrentTodoList = { ...currentTodoList, tasks: updatedTasks };
      const updatedTodoLists = todoLists.map((list) =>
        list.name === currentTodoList.name ? updatedCurrentTodoList : list
      );
      setCurrentTodoList(updatedCurrentTodoList);
      setTodoLists(updatedTodoLists);
      setEditingPriorityTask(null);
    }
  };

  console.log(todoLists, "todo")

  return (
    <div className="todo-container">
      <div className="sidebar">
        <div className="profile-section">
          <img src={Tree} alt="profile" className="profile-pic" />
          <div>
            <h3>Priyanka R</h3>
            <p>Front End Developer</p>
          </div>
        </div>
        <div className="side">
          <button onClick={() => setShowCreatePopup(true)} className="Sidebarr">
            + Create a new To-do-list
          </button>
          {showCreatePopup && <TodoPopup
            onClose={() => setShowCreatePopup(false)}
            onSave={(name, image) => {

              const listExists = todoLists.some((list) => list.name === name);

              if (!listExists) {
                const newTodoList = { name, image, tasks: [] };
                setTodoLists((prev) => [...prev, newTodoList]);
                setCurrentTodoList(newTodoList);
              }

              setShowCreatePopup(false);
            }}
          />
          }
        </div>
        <ul className="task-list-sidebar">
          <hr />
          {todoLists.map((list, index) => (
            <li key={index}>
              <div className="arrow">
                <img
                  src={Icon}
                  alt="arrow"
                  className={`arrow-image ${expandedTasks[list.name] ? 'down' : ''}`}
                  onClick={() => handleToggleTask(list)}
                />
                <div className="todo" onClick={() => handleSelectTodoList(list)}>
                  <p>{list.name}</p>
                </div>
              </div>
              {expandedTasks[list.name] && (
                <ul className="zzz">
                  {list.tasks.map((task, taskIndex) => (
                    <li key={taskIndex}>
                      <img src={Vector} alt="bullet point" className="bullet-point" />
                      {task.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>



      </div>

      <div className="todo-content">
        <div className="utt">
          <div className="utf">
            <div className="ap">
              {currentTodoList && currentTodoList.image && (
                <img src={currentTodoList.image} alt="Uploaded" className="uploaded" />
              )}
            </div>
            <div className="ut">
              <h3>{currentDate}</h3>
              <p>Created On</p>
            </div>
          </div>
          <div className="add">
            <span onClick={() => setShowPopup(true)} className="abc">
              + Add Task
            </span>
          </div>
          <div >
            <img src={Avatar} alt="avatar" className="ava" onClick={handleAvatarrClick} />


            {showAvatarMenu && (
              <div className="task-menu1" ref={avatarMenuRef}>
                <ul>
                  <div className="ree">
                    <img src={Rename} alt="Edit" className="rename" />
                    <div>
                      <div onClick={handleEditTodoList}>Edit </div>
                    </div>
                  </div>
                  <hr className="hrr" />
                  <div className="ree">
                    <div>
                      <img src={Delete} alt="Delete" className="delete" />
                    </div>
                    <div>
                      <div onClick={() => handleDeleteTodoList(currentTodoList)}>Delete</div>
                    </div>
                  </div>
                </ul>
              </div>
            )}
            {showDeletePopup && (
              <div className="popup-overlay">
                <div className="popup-content">
                  <h3>Delete To-do List</h3>
                  <p>Are you sure you want to delete "{selectedTodoList?.name}"?</p>
                  <div className="popup-buttons">
                    <button onClick={handleConfirmTodoListDelete} className="pqr">
                      I’m Sure, Delete
                    </button>
                    <button onClick={() => setShowDeletePopup(false)} className="sss">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showEditPopup && (
              <TodoPopup
                onClose={() => setShowEditPopup(false)}
                onSave={handleSaveEditedTodoList}
                initialName={currentTodoList ? currentTodoList.name : ''}
                Image={currentTodoList ? currentTodoList.image : ''}
              />
            )}


          </div>


        </div>
        {/* {showPopup && <TaskPopup onClose={() => setShowPopup(false)} onAddTask={handleAddTask} />} */}
        {currentTodoList && (
          <>
            <h2 className="ddd">{currentTodoList.name}</h2>

            <div>
              <table>
                <thead>
                  <tr>
                    <th>Task Name</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th className="tbb">Created Date & Time</th>
                  </tr>
                </thead>

                <tbody>
                  {currentTodoList && currentTodoList.tasks.length > 0 ? (
                    currentTodoList.tasks.map((task, index) => (
                      <tr key={index}>
                        <td>{task.name}</td>

                        <td>
                          {editingStatusTask === task ? (
                            <select
                              value={task.status}
                              onChange={(e) => handleStatusChange(task, e.target.value)}
                            >
                              <option value="Yet to start">Yet to start</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                            </select>
                          ) : (
                            <span
                              className={`status-label ${task.status.replace(/\s+/g, '-').toLowerCase()}`}
                              onClick={() => setEditingStatusTask(task)}
                              style={{ cursor: 'pointer' }}
                            >
                              {task.status}
                            </span>
                          )}
                        </td>
                        <td>
                          {editingPriorityTask === task ? (
                            <select
                              value={task.priority}
                              onChange={(e) => handlePriorityChange(task, e.target.value)}
                            >
                              <option value="High">High</option>
                              <option value="Medium">Medium</option>
                              <option value="Low">Low</option>
                            </select>
                          ) : (
                            <span
                              className={`priority-label ${task.priority.toLowerCase()}`}
                              onClick={() => setEditingPriorityTask(task)}
                              style={{ cursor: 'pointer' }}
                            >
                              {task.priority}
                            </span>
                          )}
                        </td>

                        <td>
                          <div className="task-date-section">
                            <div className="split">
                              <span>{task.createdDate.split(',')[0]}</span>
                              <span className="separator"> | </span>
                              <span>{task.createdDate.split(',')[1]}</span>
                            </div>
                            <img
                              src={Avatar}
                              alt="Avatar"
                              className="uploaded-tiny"
                              onClick={() => handleAvatarClick(task)}
                              style={{ cursor: 'pointer' }}
                            />

{showTaskMenuFor === task.name && selectedTask && (
  <div className="task-menu" ref={taskMenuRef} key={selectedTask.name}>
    <div className="ree-rename">
      <img src={Rename} className="rename" alt="rename" />
      <div>
        <div onClick={handleRenameTask} className="r">Rename</div>
      </div>
    </div>
    <hr />
    <div className="ree-delete">
      <img src={Delete} className="delete" alt="delete" />
      <div>
        <div onClick={handleDeleteTask} className="d">Delete</div>
      </div>
    </div>
  </div>
)}
                            <div className="adddd">
                              {showRenamePopup && (
                                <div className="popup-overlay">
                                  <div className="popup-content">
                                    <h3 className="ggg">Rename Task</h3>
                                    <span className="close" onClick={() => setShowRenamePopup(false)}>&times;</span>
                                    <label> Task Name</label>
                                    <input
                                      type="text"
                                      value={newTaskName}
                                      onChange={(e) => setNewTaskName(e.target.value)}
                                    />
                                    <div className="popupbuttons">
                                      <button onClick={handleUpdateTaskName} className="pqr">Update Name</button>
                                      <button onClick={() => setShowRenamePopup(false)} className="sss">Discard</button>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {showDeletePopup && (
                                <div className="popup-overlay">
                                  <div className="popup-content">
                                    <h3>Delete To-do List</h3>
                                    <p>Are you sure you want to delete "{selectedTask?.name}"?</p>
                                    <div className="popup-buttons">
                                      <button onClick={handleConfirmDelete} className="pqr">I’m Sure, Delete</button>
                                      <button onClick={() => setShowDeletePopup(false)} className="sss">Cancel</button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center' }}>No tasks available</td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          </>
        )}
      </div>

      {showPopup && <TaskPopup onClose={() => setShowPopup(false)} onAddTask={handleAddTask} image={image} />}
    </div>
  );
}

export default TodoListPage;
