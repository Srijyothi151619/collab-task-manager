// client/src/App.tsx
import { useEffect, useState } from 'react';

// Define what a Task looks like
interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false); // Controls the popup form
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  // 1. Fetch Tasks on Load
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://collab-task-manager-qcow.onrender.com/api/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // 2. Handle "Add Task"
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault(); // Stop page refresh
    if (!newTask.title) return alert('Title is required!');

    try {
      const response = await fetch('https://collab-task-manager-qcow.onrender.com/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        setShowForm(false); // Close form
        setNewTask({ title: '', description: '' }); // Reset inputs
        fetchTasks(); // Refresh list immediately
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Task Board</h1>
          <button 
            onClick={() => setShowForm(!showForm)} // Toggle form on click
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {showForm ? 'Close Form' : '+ New Task'}
          </button>
        </div>

        {/* The Form (Only shows when showForm is true) */}
        {showForm && (
          <form onSubmit={handleAddTask} className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Title</label>
              <input
                type="text"
                placeholder="e.g., Fix the bug"
                className="w-full border p-2 rounded"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Description</label>
              <textarea
                placeholder="Details about the task..."
                className="w-full border p-2 rounded"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </div>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Save Task
            </button>
          </form>
        )}

        {/* The Task List */}
        <div className="grid gap-4">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center text-lg">No tasks found. Create one!</p>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
                <p className="text-gray-600 mt-2">{task.description}</p>
                <div className="mt-4 flex gap-2 text-sm">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{task.status}</span>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">{task.priority}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;