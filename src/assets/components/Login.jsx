import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserProvider';
import './compo.css'; // optional, keep if needed

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', loginData);

    fetch("http://localhost:3000/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    })
    .then(res => res.json())
    .then(data => {
      console.log("Login response:", data);
      if (data.message === "Login successful!") {
        setUserData(data);
        navigate(`/user/${data.userId}`);
      }
    })
    .catch(err => console.error("Login error:", err));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      
      {/* Login Form */}
      <div className="login-container bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition-all duration-500 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-8 text-center animate-pulse">
          Task_Management Login
        </h1>

        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
          <label htmlFor="email" className="text-gray-700 font-semibold">Email:</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            placeholder="Enter Email" 
            value={loginData.email}
            onChange={handleLoginChange}
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
            onChange={handleLoginChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            required
          />

          <button 
            type="submit" 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            LOGIN
          </button>
        </form>

        <Link to="/" className="block mt-6">
          <button className="w-full bg-white/20 border border-white text-white font-semibold py-3 rounded-lg hover:bg-white/30 transition-all duration-300">
            Don’t have Account? SIGNUP
          </button>
        </Link>
      </div>

      {/* Optional Image / Decorative Side */}
      <div className="loginimage hidden md:block md:w-1/2 h-96 md:h-auto bg-[url('https://images.unsplash.com/photo-1590608897129-79f7b6e3b9e0?fit=crop&w=800&q=80')] bg-cover bg-center rounded-2xl ml-6 transform transition-all duration-500 hover:scale-105"></div>
    </div>
  );
};

export default Login;
