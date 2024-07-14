import React, { useState } from 'react';
import { login } from '../services/AuthenticationService';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginPage: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await login(userName, password);
            alert('Login successful');
            console.log('Token:', data.token);
            navigate('/listpost'); 
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleLogin} className="auth-form">
                <h2 className="auth-title">Login</h2>
                <input
                    className="auth-input"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Username"
                />
                <input
                    className="auth-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button className="auth-button" type="submit">Login</button>
                <div className="auth-switch">
                    <a href="/register">Switch to Register</a>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
