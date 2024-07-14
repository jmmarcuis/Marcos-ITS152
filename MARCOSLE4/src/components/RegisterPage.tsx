import React, { useState } from 'react';
import { register } from '../services/AuthenticationService';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(userName, firstName, lastName, password);
            alert('Registration successful');
            // Redirect to login page
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed');
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleRegister} className="auth-form">
                <h2 className="auth-title">Register</h2>
                <input
                    className="auth-input"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    className="auth-input"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    required
                />
                <input
                    className="auth-input"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    required
                />
                <input
                    className="auth-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button className="auth-button" type="submit">Register</button>
                <div className="auth-switch">
                    <a href="/login">Already have an account? Login</a>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;