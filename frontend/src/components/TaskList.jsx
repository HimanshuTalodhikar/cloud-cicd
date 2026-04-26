const TaskList = ({ tasks, onUpdateStatus, onDelete }) => {
    if (!tasks || tasks.length === 0) {
        return (
            <div className="empty-state">
                <h3>No tasks found</h3>
                <p>You don't have any tasks yet. Create one to get started!</p>
            </div>
        );
    }

    return (
        <div className="task-list">
            <h2>All Tasks</h2>
            <div className="tasks-grid">
                {tasks.map((task) => (
                    <div 
                        key={task.id} 
                        className={`task-card ${task.status === 'COMPLETED' ? 'task-completed' : ''}`}
                    >
                        <div className="task-header">
                            <span className={`status-badge status-${task.status.toLowerCase()}`}>
                                {task.status}
                            </span>
                            <span className="task-date">
                                {new Date(task.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        
                        <h3 className="task-title">{task.title}</h3>
                        <p className="task-desc">
                            {task.description || <span className="no-desc">No description provided.</span>}
                        </p>
                        
                        <div className="task-actions">
                            <button 
                                className={`btn-sm ${task.status === 'COMPLETED' ? 'btn-outline-warning' : 'btn-success'}`}
                                onClick={() => onUpdateStatus(task.id, task.status)}
                            >
                                {task.status === 'COMPLETED' ? 'Mark Pending' : 'Mark Completed'}
                            </button>
                            <button 
                                className="btn-sm btn-danger"
                                onClick={() => {
                                    if(window.confirm('Are you sure you want to delete this task?')) {
                                        onDelete(task.id);
                                    }
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;
