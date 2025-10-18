import React, { useContext } from 'react';
import { UserContext } from './UserProvider';
import './compo.css'; // keep this if needed

const Taskcard = (props) => {
  const { userData, setUserData } = useContext(UserContext);

  const handleDelete = () => {
    fetch("http://localhost:3000/delete", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userData.userId, taskName: props.name })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setUserData(prev => {
        const updatedTask = prev.taskArray.filter(task => task.taskName !== props.name);
        return { ...prev, taskArray: updatedTask };
      });
    })
    .catch(err => console.error(err));
  };

  return (
    <div className="taskcard bg-white/90 backdrop-blur-md shadow-lg rounded-xl p-6 mb-4 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      
      <div className="today flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold text-purple-600 animate-pulse">📝</h1>
        <h2 className="text-sm font-semibold text-gray-500 uppercase">{props.category}</h2>
      </div>

      <div className="uhave text-gray-800 font-medium mb-4 text-lg">
        {props.name}
      </div>

      <div className="response flex gap-3">
        <button
          id="b1"
          onClick={handleDelete}
          className="flex-1 bg-gradient-to-r from-green-400 to-green-600 text-white py-2 rounded-lg shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          Completed ✅
        </button>

        <button
          id="b2"
          className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-2 rounded-lg shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          Ongoing 🚫
        </button>
      </div>
    </div>
  );
};

export default Taskcard;
