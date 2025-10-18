import React, { useContext } from 'react';
import './compo.css';
import Taskcard from './Taskcard';
import { UserContext } from './UserProvider';

const Alltask = () => {
  const { userData } = useContext(UserContext);
   
  

  return (
  <>
    <div className="alltask-container">
      {userData?.taskArray && userData.taskArray.map((task, index) => (
        <div className='all' key={index}>
          <Taskcard category={task.category} name={task.taskName} />
        </div>
      ))}
    </div>


    
  </>
  );
};

export default Alltask;
