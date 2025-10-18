import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from './UserProvider';

// --- Icons ---
const TaskIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

const AssignedTaskIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const UserPage = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [isVisible, setIsvisible] = useState(false);
  const [isAssignedVisible, setIsAssignedVisible] = useState(false);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [quote, setQuote] = useState('');
  const [category, setCategory] = useState('');
  const { register, handleSubmit, reset } = useForm();

  const API_BASE_URL = import.meta.env.VITE_API_URL; // ✅ Use environment variable here

  const sanskritQuotes = [
    "सर्वे भवन्तु सुखिनः। सर्वे सन्तु निरामयाः।",
    "अहिंसा परमो धर्मः।",
    "विद्या ददाति विनयं।",
    "सत्यमेव जयते।",
    "धर्मो रक्षति रक्षितः।",
    "योगः कर्मसु कौशलम्।",
    "मातृदेवो भव। पितृदेवो भव।",
    "उद्धरेदात्मनाऽत्मानं।",
    "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
    "स्वधर्मे निधनं श्रेयः। परधर्मो भयावहः।"
  ];

  useEffect(() => {
    const randomQuote = sanskritQuotes[Math.floor(Math.random() * sanskritQuotes.length)];
    setQuote(randomQuote);

    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [userData]);

  const handleAddTask = async (data) => {
    if (!data.taskName.trim()) return alert('Please enter a task name');

    const newTask = { taskName: data.taskName, category: category || 'No category' };

    setUserData(prev => {
      const updatedTasks = [...(prev.taskArray || []), newTask];
      return { ...prev, taskArray: updatedTasks };
    });

    reset();
    setCategory('');

    try {
      const res = await fetch(`${API_BASE_URL}/user/${userData?.userId}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      const result = await res.json();
      console.log("Task Added Successfully", result);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const showMyTasks = () => {
    setIsvisible(!isVisible);
    setIsAssignedVisible(false);
  };

  const showNoti = async () => {
    setIsAssignedVisible(!isAssignedVisible);
    setIsvisible(false);

    if (!isAssignedVisible && assignedTasks.length === 0) {
      try {
        const res = await fetch(`${API_BASE_URL}/notifications`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userData?.email }),
        });
        const data = await res.json();
        setAssignedTasks(data.data || []);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    }
  };

  // Rest of your JSX remains the same
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-100 via-white to-indigo-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white/70 backdrop-blur-xl shadow-lg p-6 flex-shrink-0 border-r border-gray-200 hidden md:flex flex-col justify-between">
        <div>
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-indigo-700">TaskFlow</h1>
            <p className="text-gray-500 text-sm mt-1">User Dashboard</p>
          </div>
          <ul className="mt-10 space-y-3">
            <li>
              <button
                onClick={showNoti}
                className={`w-full flex items-center gap-3 font-semibold px-4 py-2.5 rounded-lg transition-all ${isAssignedVisible ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-700 hover:bg-indigo-100'}`}
              >
                <AssignedTaskIcon />
                Assigned Tasks
              </button>
            </li>
            <li>
              <button
                onClick={showMyTasks}
                className={`w-full flex items-center gap-3 font-semibold px-4 py-2.5 rounded-lg transition-all ${isVisible ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-700 hover:bg-indigo-100'}`}
              >
                <TaskIcon />
                My Tasks
              </button>
            </li>
          </ul>
        </div>
        <div className="text-sm text-gray-400 text-center">
          <p>© 2025 TaskFlow</p>
        </div>
      </aside>

      {/* Main Section */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Hello, {userData?.name || 'User'} 👋</h2>
            <p className="text-gray-500 mt-1">You have {userData?.taskArray?.length || 0} tasks.</p>
          </div>
        </header>

        {/* Quote Card */}
        <div
          onClick={() => setQuote(sanskritQuotes[Math.floor(Math.random() * sanskritQuotes.length)])}
          className="bg-white/60 backdrop-blur-lg border border-gray-200 rounded-xl p-4 text-center text-gray-600 cursor-pointer shadow-sm hover:shadow-md transition-all"
        >
          <p className="italic">"{quote}"</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Add Task Form */}
          <div className="lg:col-span-1 bg-white/70 backdrop-blur-md border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Task</h3>

            <form onSubmit={handleSubmit(handleAddTask)} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {['Daily_Task', 'Weekly_Task', 'Emergency_Task', 'Aera-Gaira', 'Others'].map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-1 text-sm rounded-full transition-all ${category === cat ? 'bg-indigo-600 text-white shadow-sm' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                    >
                      {cat.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="taskName" className="text-sm font-medium text-gray-700 mb-1 block">Task Name</label>
                <input
                  id="taskName"
                  {...register('taskName', { required: true })}
                  placeholder="Enter task name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md transition-all"
              >
                Add Task
              </button>
            </form>
          </div>

          {/* Task List and Assigned Tasks */}
          {isVisible && (
            <div className="lg:col-span-2 bg-white/80 backdrop-blur-md border border-gray-200 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Tasks</h3>
              {userData?.taskArray?.length ? (
                <ul className="space-y-3">
                  {userData.taskArray.map((task, index) => (
                    <li key={index} className="p-4 bg-gray-50 rounded-lg border flex justify-between items-center">
                      <span className="font-medium text-gray-800">{task.taskName}</span>
                      <span className="text-xs font-semibold bg-indigo-500 text-white px-2 py-1 rounded-full">
                        {task.category}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No tasks found. Add a new one!</p>
              )}
            </div>
          )}

          {isAssignedVisible && (
            <div className="lg:col-span-2 bg-white/80 backdrop-blur-md border border-gray-200 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Assigned Tasks</h3>
              {assignedTasks.length ? (
                <ul className="space-y-3">
                  {assignedTasks.map((task, i) => (
                    <li key={i} className="p-4 bg-gray-50 rounded-lg border">
                      <p className="font-semibold text-gray-800">{task.taskname}</p>
                      <p className="text-sm text-gray-500">Assigned by: {task.assignedBy}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No assigned tasks found.</p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserPage;
