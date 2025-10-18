import React from 'react'
import './Admin.css'

const TaskCard = (props) => {
  
  return (
    <div className='task_card'>
        <div className='task_card_header'></div>
        <div className='all_task'><span>To</span>:{props.assignto}</div>
        
        <div className="task_name">Work:{props.taskname}</div>
        <div className='verti'></div>
        <div className="buttons">
          <button className='done'>✅</button>
        <button className='cancel'>❌</button>
        </div>
    </div>
  )
}

export default TaskCard