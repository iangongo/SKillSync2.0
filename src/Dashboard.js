import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

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

export default Dashboard;
