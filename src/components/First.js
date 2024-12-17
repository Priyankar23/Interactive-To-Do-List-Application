import React, { useState } from 'react';
import './First.css';
import Tree from './Tree.jpg';
import TodoPopup from './TodoPopup';


function First() {
  const [showPopup, setShowPopup] = useState(false);
  const [todoLists, setTodoLists] = useState([]);

  const handleCreateTodoList = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSaveTodoList = (name, image) => {
    const newTodoList = { name, image, tasks: [] };
    setTodoLists((prev) => [...prev, newTodoList]);
    setShowPopup(false);  
  };

  return (
    <div className="prop">
      <div className="profile">
        <img src={Tree} alt="pro" />
        <h3>Priyanka R</h3>
        <p>Front End Developer</p>
      </div>
      <div className="prop11">
        <h2>Seems like you haven’t created a <br /> To-do-list yet!</h2>
        <p>Helps focus on urgent and important tasks.</p>
        <button onClick={handleCreateTodoList}>+ Create a new To-do-list</button>
      </div>
      {showPopup && (
        <TodoPopup
          onClose={handleClosePopup}
          onSave={handleSaveTodoList} 
        />
      )}
    </div>
  );
}

export default First; 