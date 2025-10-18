import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../UserProvider';

// --- Icons ---
const TaskIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);

const LoadingSpinner = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

// --- Sidebar Component ---
const Sidebar = () => (
    <nav className="w-64 bg-white shadow-md flex-shrink-0 hidden md:block">
        <div className="p-6">
            <h1 className="text-2xl font-bold text-indigo-600">TaskFlow</h1>
            <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
        </div>
        <ul className="mt-6 space-y-2 px-4">
            <li>
                <a href="#" className="flex items-center gap-3 bg-indigo-100 text-indigo-700 font-semibold rounded-lg px-4 py-2.5">
                    <TaskIcon />
                    <span>Dashboard</span>
                </a>
            </li>
            <li>
                <a href="#" className="flex items-center gap-3 hover:bg-gray-100 text-gray-600 font-medium rounded-lg px-4 py-2.5 transition-colors">
                    <TaskIcon />
                    <span>Assigned Tasks</span>
                </a>
            </li>
        </ul>
    </nav>
);

// --- Admin Dashboard Component ---
const AdminDash = () => {
    const { userData, setUserData } = useContext(UserContext);
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState({ message: '', type: '' });

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (userData?.taskAssignArray) {
            setTasks(userData.taskAssignArray);
        }
    }, [userData]);

    const showFeedback = (message, type = 'success') => {
        setFeedback({ message, type });
        setTimeout(() => setFeedback({ message: '', type: '' }), 4000);
    };

    const onSubmit = async (data) => {
        setIsLoading(true);

        try {
            const response = await fetch(`http://localhost:3000/admindash/${userData?._id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result?.data) {
                setUserData(result.data);
                setTasks(result.data.taskAssignArray || []);
                reset();
                showFeedback('Task assigned successfully!', 'success');
            } else {
                showFeedback('Failed to assign task.', 'error');
            }
        } catch (error) {
            console.error('Error assigning task:', error);
            showFeedback('Server error. Try again later.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-100 font-sans">
            <Sidebar />
            <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
                <header>
                    <h2 className="text-3xl font-bold text-gray-800">Welcome back, {userData?.name || 'Admin'}!</h2>
                    <p className="text-gray-500 mt-1">You have {tasks.length} active tasks.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    {/* Assign Task Form */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800">Assign a New Task</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="taskname" className="block text-sm font-medium text-gray-700 mb-1">Task Description</label>
                                <textarea
                                    id="taskname"
                                    placeholder="Enter task description"
                                    {...register('taskname', { required: true })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                                />
                                {errors.taskname && <p className="text-red-500 text-sm mt-1">Task description is required</p>}
                            </div>
                            <div>
                                <label htmlFor="assignTo" className="block text-sm font-medium text-gray-700 mb-1">Assign To (Email)</label>
                                <input
                                    id="assignTo"
                                    type="email"
                                    placeholder="employee@example.com"
                                    {...register('assignTo', { required: true })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
                                />
                                {errors.assignTo && <p className="text-red-500 text-sm mt-1">Email is required</p>}
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white font-semibold py-2.5 px-4 rounded-md shadow-sm hover:bg-indigo-700 transition disabled:bg-indigo-400 disabled:cursor-not-allowed"
                            >
                                {isLoading ? <LoadingSpinner /> : 'Assign Task'}
                            </button>
                        </form>
                    </div>

                    {/* Assigned Tasks List */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800">Currently Assigned Tasks</h3>
                        <div className="mt-6 flow-root">
                            {tasks.length > 0 ? (
                                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead>
                                                <tr>
                                                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Task Description</th>
                                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Assigned To</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {tasks.map((task, index) => (
                                                    <tr key={index}>
                                                        <td className="whitespace-normal py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{task.taskname}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{task.Assignto}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                                    <TaskIcon className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks assigned</h3>
                                    <p className="mt-1 text-sm text-gray-500">Start by assigning a new task.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Feedback Toast */}
            {feedback.message && (
                <div className={`fixed top-5 right-5 p-4 rounded-lg shadow-lg text-white ${feedback.type === 'success' ? 'bg-green-500' : 'bg-red-500'} transition-opacity duration-300`}>
                    {feedback.message}
                </div>
            )}
        </div>
    );
};

export default AdminDash;
