import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [skills, setSkills] = useState([]);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            fetchUserData();
        }
    }, []);

    const fetchUserData = () => {
        fetch('/api/skills')
            .then(response => response.json())
            .then(data => {
                setSkills(data);
                setGoals([
                    { id: 1, skill: 'JavaScript', target: 90, deadline: '2023-12-31' },
                    { id: 2, skill: 'React', target: 80, deadline: '2023-11-30' },
                ]);
            });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        localStorage.setItem('token', 'fake-jwt-token');
        setIsLoggedIn(true);
        fetchUserData();
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setSkills([]);
        setGoals([]);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">SkillSync</a>
                    {isLoggedIn && (
                        <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
                    )}
                </div>
            </nav>

            <div className="container mt-5">
                {!isLoggedIn ? (
                    <LoginForm onLogin={handleLogin} />
                ) : (
                    <Dashboard skills={skills} goals={goals} />
                )}
            </div>
        </div>
    );
}

export default App;
