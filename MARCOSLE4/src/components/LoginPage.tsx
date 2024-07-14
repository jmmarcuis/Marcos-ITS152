// src/components/AuthenticatePage.tsx
import React, { useState } from 'react';
import { login, register } from '../services/AuthenticationService';

const AuthenticatePage: React.FC = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(userName, password);
            alert('Login successful');
        } catch (error) {
            alert('Login failed');
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(userName, firstName, lastName, password);
            alert('Registration successful');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <div>
            {isLogin ? (
                <form onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Username"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button type="submit">Login</button>
                    <button type="button" onClick={() => setIsLogin(false)}>Switch to Register</button>
                </form>
            ) : (
                <form onSubmit={handleRegister}>
                    <h2>Register</h2>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Username"
                    />
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                    />
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button type="submit">Register</button>
                    <button type="button" onClick={() => setIsLogin(true)}>Switch to Login</button>
                </form>
            )}
        </div>
    );
};

export default AuthenticatePage;
