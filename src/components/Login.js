import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [registeredUsers, setRegisteredUsers] = useState([]);

    const handleLogin = (e) => {
        e.preventDefault();
        const userExists = registeredUsers.some(
            (user) => user.username === username && user.password === password
        );
        if (userExists) {
            onLogin();
        } else {
            alert('Invalid Username or Password');
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const userAlreadyExists = registeredUsers.some(
            (user) => user.username === username
        );
        if (userAlreadyExists) {
            alert('Username already taken');
        } else if (username && password) {
            setRegisteredUsers([...registeredUsers, { username, password }]);
            alert('Registration successful');
            setIsRegistering(false); 
        } else {
            alert('Please provide a valid Username and Password');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={isRegistering ? handleRegister : handleLogin}>
                <h2>{isRegistering ? 'Register' : 'Login'}</h2>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="submit">
                    <button type="submit" className="a">
                        {isRegistering ? 'Register' : 'Login'}
                    </button>
                </div>
                <div className="toggle">
                    <button
                        type="button"
                        onClick={() => setIsRegistering(!isRegistering)}
                        className="toggle-button"
                    >
                        {isRegistering
                            ? 'Already have an account? Login'
                            : "Don't have an account? Register"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
