import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../UserProvider';
import { useNavigate } from 'react-router-dom';
import './Admin.css'; // keep if needed

const Admin = () => {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("✅ Updated userData:", userData);
  }, [userData]);

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/admin", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Login response:", data);
        if (data.message === "Admin_found") {
          setUserData(data.data);
          navigate("/admindash/" + data.data._id);
        }
      })
      .catch(err => console.error("Login error:", err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition-all duration-500 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-purple-700 text-center mb-8 animate-pulse">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="username" className="text-gray-700 font-semibold">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter Username"
            value={loginData.username}
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            required
          />

          <label htmlFor="password" className="text-gray-700 font-semibold">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            required
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
