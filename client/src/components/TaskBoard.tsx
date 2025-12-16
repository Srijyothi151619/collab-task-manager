// src/components/TaskBoard.tsx
import useSWR from 'swr';
import { fetcher } from '../utils/api';

// Define the Task shape
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Review' | 'Completed';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
}

export default function TaskBoard() {
  // Fetch tasks from the backend
  const { data: tasks, error, isLoading } = useSWR<Task[]>('/tasks', fetcher);

  if (isLoading) return <div className="p-10 text-center text-xl">Loading tasks...</div>;
  if (error) return <div className="p-10 text-center text-red-500">Error loading tasks. Is the backend running?</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Task Board</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          + New Task
        </button>
      </header>

      {/* Grid of Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks?.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">No tasks found. Create one!</p>
        )}
        
        {tasks?.map((task) => (
          <div key={task.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg text-gray-900">{task.title}</h3>
              <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                task.priority === 'High' || task.priority === 'Urgent' 
                  ? 'bg-red-100 text-red-700' 
                  : 'bg-green-100 text-green-700'
              }`}>
                {task.priority}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{task.description}</p>
            <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}