import React, { useContext } from 'react';
import './Admin.css';
import { UserContext } from '../UserProvider';
import TaskCard from './TaskCard';

const AssignedTasks = () => {
  const { userData } = useContext(UserContext);
  return (
    <div className='assigned-tasks'>
      <div className="sidebar">
        <div className="counttasks">
          <span>{userData.taskAssignArray.length}</span>
        </div>
      </div>

      <div className="taskshower">
        <div className='task-card'>
        
          <p>Admin Name: {userData.username}</p>  

          {
            userData?.taskAssignArray.map((task, index) => (
              <div key={index}>
                <TaskCard taskname={task.taskname} assignto={task.Assignto}/>
              </div>
            ))
          }

        </div>
      </div>
    </div>
  );
};

export default AssignedTasks;
