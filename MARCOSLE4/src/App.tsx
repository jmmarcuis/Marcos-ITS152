 import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ListPostPage from './components/ListPostPage';
import PostDetailPage from './components/PostDetailPage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/listpost" element={<ListPostPage />} />
                <Route path="/post/:id" element={<PostDetailPage />} />
            </Routes>
        </Router>
    );
};

export default App;