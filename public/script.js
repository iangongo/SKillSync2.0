const { useState, useEffect } = React;

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
        // Simulating API calls to fetch user data
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

function LoginForm({ onLogin }) {
    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title text-center mb-4">Login to SkillSync</h2>
                        <form onSubmit={onLogin}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" required />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Dashboard({ skills, goals }) {
    useEffect(() => {
        const ctx = document.getElementById('skillChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: skills.map(skill => skill.name),
                datasets: [{
                    label: 'Skill Progress',
                    data: skills.map(skill => skill.progress),
                    backgroundColor: 'rgba(52, 152, 219, 0.6)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }, [skills]);

    return (
        <div>
            <h1 className="mb-4">Welcome to SkillSync</h1>
            <div className="row">
                <div className="col-md-8">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h2 className="card-title">Skill Progress</h2>
                            <canvas id="skillChart"></canvas>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h2 className="card-title">Goals</h2>
                            <ul className="list-group">
                                {goals.map(goal => (
                                    <li key={goal.id} className="list-group-item">
                                        <strong>{goal.skill}</strong>: {goal.target}% by {goal.deadline}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Google Calendar Integration</h2>
                            <p>Connect your Google Calendar to schedule study sessions and track your progress over time.</p>
                            <button className="btn btn-primary">Connect Google Calendar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
