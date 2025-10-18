import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './compo.css'; // you can keep this if needed for other styles

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [role, setRole] = useState('user'); // default role
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = role === 'admin' ? '/adminsignup' : '/signup';

    try {
      const res = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      console.log('Response:', data);

      if (res.ok) {
        alert(`${role} registered successfully`);
        navigate(role === 'admin' ? '/adminLogin' : '/login');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-wide drop-shadow-lg animate-pulse">
        Task_Management
      </h1>

      <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition-all duration-500 hover:scale-105">
        <form method="post" onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="username" className="text-gray-700 font-semibold">Username:</label>
          <input 
            type="text"
            name="username"
            id="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          />

          <label htmlFor="email" className="text-gray-700 font-semibold">Email:</label>
          <input 
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          />

          <label htmlFor="password" className="text-gray-700 font-semibold">Password:</label>
          <input 
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            SIGNUP
          </button>
        </form>

        <a href="/adminlogin" className="block mt-4">
          <button className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            Sign in As Admin
          </button>
        </a>
      </div>

      <div className="mt-6 flex flex-col gap-3 w-full max-w-md">
        <Link to="/login">
          <button
            className="w-full bg-white/20 border border-white text-white font-semibold py-3 rounded-lg hover:bg-white/30 transition-all duration-300"
            onClick={() => setRole('user')}
          >
            Already have Account? LOGIN
          </button>
        </Link>

        <button
          className="w-full bg-white/20 border border-white text-white font-semibold py-3 rounded-lg hover:bg-white/30 transition-all duration-300"
          onClick={() => setRole(role === 'admin' ? 'user' : 'admin')}
        >
          Click to change The Role: <span className="capitalize">{role}</span>
        </button>
      </div>
    </div>
  );
};

export default Signup;
