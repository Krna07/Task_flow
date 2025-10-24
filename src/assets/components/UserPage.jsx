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

  const API_BASE_URL = import.meta.env.VITE_API_URL; 

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

  // ----------------- Add Task -----------------
  const handleAddTask = async (data) => {
    if (!data.taskName.trim()) return alert('Please enter a task name');

    const newTask = { taskName: data.taskName, category: category || 'No category', taskTime: data.taskTime };

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

  // ----------------- Delete Task -----------------
  const handleDeleteTask = async (taskName) => {
    if (!window.confirm(`Are you sure you want to delete "${taskName}"?`)) return;

    try {
      const res = await fetch(`${API_BASE_URL}/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userData?.userId, taskName }),
      });
      const result = await res.json();

      if (res.ok) {
        setUserData(prev => ({
          ...prev,
          taskArray: prev.taskArray.filter(task => task.taskName !== taskName)
        }));
        alert("Task deleted successfully");
      } else {
        alert(result.message || "Failed to delete task");
      }
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Something went wrong while deleting the task");
    }
  };

  // ----------------- Delete Assigned Task -----------------
  const handleDeleteAssignedTask = (taskIndex) => {
    if (!window.confirm(`Mark this assigned task as completed?`)) return;

    setAssignedTasks(prev => prev.filter((_, index) => index !== taskIndex));
  };

  // ----------------- Show Tasks -----------------
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

  // ----------------- JSX -----------------
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-indigo-100 via-white to-indigo-50 font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white/30 backdrop-blur-2xl shadow-lg p-4 md:p-6 flex md:flex-col justify-between border-b md:border-r border-gray-200 md:h-auto flex-row md:flex-col overflow-x-auto rounded-b-xl md:rounded-r-xl">
        <div className="flex md:flex-col justify-between w-full">
          <div className="text-center md:mb-8 flex md:flex-col items-center gap-4 md:gap-0">
            <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-700 tracking-wide">TaskFlow</h1>
            <p className="text-gray-400 text-sm">User Dashboard</p>
          </div>
          <ul className="flex md:flex-col gap-2 md:gap-3 mt-4 md:mt-10 w-full">
            <li>
              <button
                onClick={showNoti}
                className={`flex items-center gap-2 md:gap-3 font-semibold px-3 py-2 md:px-4 md:py-2.5 rounded-xl transition-all ${isAssignedVisible ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'text-gray-700 hover:bg-indigo-100 hover:scale-105'}`}
              >
                <AssignedTaskIcon />
                <span className="hidden md:inline">Assigned Tasks</span>
              </button>
            </li>
            <li>
              <button
                onClick={showMyTasks}
                className={`flex items-center gap-2 md:gap-3 font-semibold px-3 py-2 md:px-4 md:py-2.5 rounded-xl transition-all ${isVisible ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'text-gray-700 hover:bg-indigo-100 hover:scale-105'}`}
              >
                <TaskIcon />
                <span className="hidden md:inline">My Tasks</span>
              </button>
            </li>
          </ul>
        </div>
        <div className="text-sm text-gray-400 text-center mt-4 md:mt-6">
          <p>© 2025 TaskFlow</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-3 sm:gap-0">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Hello, {userData?.name || 'User'} 👋</h2>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              You have <span className="font-medium text-indigo-600">{userData?.taskArray?.length || 0}</span> tasks.
            </p>
          </div>
        </header>

        {/* Quote */}
        <div
          onClick={() => setQuote(sanskritQuotes[Math.floor(Math.random() * sanskritQuotes.length)])}
          className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50/50 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 text-center text-gray-700 cursor-pointer shadow-md hover:shadow-xl transition-all hover:scale-[1.02] mb-6"
        >
          <p className="italic text-base sm:text-lg font-medium">"{quote}"</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Add Task Form */}
          <div className="lg:col-span-1 bg-white/30 backdrop-blur-xl border border-gray-200 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400">
              Add New Task
            </h3>

            <form onSubmit={handleSubmit(handleAddTask)} className="space-y-4 sm:space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {['Daily_Task', 'Weekly_Task', 'Emergency_Task', 'Aera-Gaira', 'Others'].map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-1 text-sm rounded-full transition-all font-semibold ${category === cat ? 'bg-indigo-600 text-white shadow-inner shadow-indigo-300 scale-105' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition hover:shadow-md"
                />
                <label className="text-sm font-medium text-gray-700 mb-1 block">Task Time</label>
                <input
                  type="datetime-local"
                  {...register('taskTime', { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />  
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg transition-all hover:scale-[1.02]"
              >
                Add Task
              </button>
            </form>
          </div>

          {/* My Tasks */}
          {isVisible && (
            <div className="lg:col-span-2 bg-white/30 backdrop-blur-xl border border-gray-200 p-4 sm:p-6 rounded-2xl shadow-lg mb-4 lg:mb-0 max-h-[450px] overflow-y-auto">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400">
                Your Tasks
              </h3>
              {userData?.taskArray?.length ? (
                <ul className="space-y-3">
                  {userData.taskArray.map((task, index) => (
                    <li key={index} className="p-3 sm:p-4 bg-gray-50 rounded-xl border flex justify-between items-center shadow-sm hover:shadow-md transition-all">
                      <div>
                        <span className="font-medium text-gray-800">{task.taskName}</span>
                        <span className="text-xs font-semibold bg-indigo-500 text-white px-2 py-1 rounded-full ml-2">
                          {task.category}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteTask(task.taskName)}
                        className="text-red-500 hover:text-red-700 font-bold px-2 py-1 rounded-md"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No tasks found. Add a new one!</p>
              )}
            </div>
          )}

          {/* Assigned Tasks */}
          {isAssignedVisible && (
            <div className="lg:col-span-2 bg-white/30 backdrop-blur-xl border border-gray-200 p-4 sm:p-6 rounded-2xl shadow-lg max-h-[450px] overflow-y-auto">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400">
                Assigned Tasks
              </h3>
              {assignedTasks.length ? (
                <ul className="space-y-3">
                  {assignedTasks.map((task, i) => (
                    <li key={i} className="p-3 sm:p-4 bg-gray-50 rounded-xl border shadow-sm hover:shadow-md transition-all flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-800">{task.taskname}</p>
                        <p className="text-sm text-gray-500">Assigned by: {task.assignedBy}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteAssignedTask(i)}
                        className="text-red-500 hover:text-red-700 font-bold px-2 py-1 rounded-md"
                      >
                        Delete
                      </button>
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
