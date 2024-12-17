
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import First from './components/First';
import React, { useState } from 'react';
import TodoPopup from './components/TodoPopup'; 
import TodoListPage from './components/TodoListPage';
import TaskPopup from './components/TaskPopup';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
    <div className="App">
      <Routes>
        {!isAuthenticated ? (
          <Route path="/" element={<Login onLogin={handleLogin} />} />
        ) : (
          <>
            <Route path="/" element={<First />} />
            <Route path="/create-todo" element={<TodoPopup />} />
            <Route path="/todo-list" element={<TodoListPage />} />
          </>
        )}
      </Routes>
    </div>
  </Router>
  );
}

export default App;
