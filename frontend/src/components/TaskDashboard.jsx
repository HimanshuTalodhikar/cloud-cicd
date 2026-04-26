import { useState, useEffect } from 'react';
import { getTasks, getTaskSummary, createTask, updateTaskStatus, deleteTask } from '../api/taskApi';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const TaskDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const loadData = async () => {
        try {
            setLoading(true);
            const [tasksData, summaryData] = await Promise.all([
                getTasks(),
                getTaskSummary()
            ]);
            setTasks(tasksData);
            setSummary(summaryData.message);
            setError(null);
        } catch (err) {
            setError('Failed to fetch data from server. Please make sure the backend is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleCreateTask = async (taskData) => {
        try {
            await createTask(taskData);
            await loadData();
            setShowForm(false);
        } catch (err) {
            setError('Failed to create task');
            console.error(err);
        }
    };

    const handleUpdateStatus = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === 'PENDING' ? 'COMPLETED' : 'PENDING';
            await updateTaskStatus(id, newStatus);
            await loadData();
        } catch (err) {
            setError('Failed to update task status');
            console.error(err);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id);
            await loadData();
        } catch (err) {
            setError('Failed to delete task');
            console.error(err);
        }
    };

    const summaryParts = summary ? summary.split(', ') : [];
    const total = summaryParts[0] ? summaryParts[0].split(': ')[1] : 0;
    const pending = summaryParts[1] ? summaryParts[1].split(': ')[1] : 0;
    const completed = summaryParts[2] ? summaryParts[2].split(': ')[1] : 0;

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Task Management System</h1>
                <p className="subtitle">Manage your daily tasks efficiently</p>
            </header>

            {error && (
                <div className="error-banner">
                    {error}
                </div>
            )}

            <section className="summary-cards">
                <div className="card total-card">
                    <h3>Total Tasks</h3>
                    <div className="number">{total}</div>
                </div>
                <div className="card pending-card">
                    <h3>Pending</h3>
                    <div className="number">{pending}</div>
                </div>
                <div className="card completed-card">
                    <h3>Completed</h3>
                    <div className="number">{completed}</div>
                </div>
            </section>

            <section className="actions-section">
                <button 
                    className={`btn ${showForm ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? 'Cancel' : '+ Add New Task'}
                </button>
            </section>

            {showForm && (
                <section className="form-section slide-down">
                    <TaskForm onSubmit={handleCreateTask} onCancel={() => setShowForm(false)} />
                </section>
            )}

            <section className="tasks-section">
                {loading ? (
                    <div className="loader">Loading tasks...</div>
                ) : (
                    <TaskList 
                        tasks={tasks} 
                        onUpdateStatus={handleUpdateStatus} 
                        onDelete={handleDeleteTask} 
                    />
                )}
            </section>
        </div>
    );
};

export default TaskDashboard;
