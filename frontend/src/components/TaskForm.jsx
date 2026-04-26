import { useState } from 'react';

const TaskForm = ({ onSubmit, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!title.trim()) {
            setError('Title is required');
            return;
        }

        onSubmit({ title, description });
        setTitle('');
        setDescription('');
        setError('');
    };

    return (
        <div className="task-form-card">
            <h2>Create New Task</h2>
            <form onSubmit={handleSubmit}>
                {error && <div className="form-error">{error}</div>}
                
                <div className="form-group">
                    <label htmlFor="title">Task Title *</label>
                    <input 
                        type="text" 
                        id="title"
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task title"
                        className={error ? 'input-error' : ''}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        id="description"
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter task description (optional)"
                        rows="4"
                    />
                </div>

                <div className="form-actions">
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Save Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
