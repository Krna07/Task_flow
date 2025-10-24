
import './App.css'
import Signup from './assets/components/Signup'
import Login from './assets/components/Login'
import { Routes, Route } from 'react-router-dom';
import UserPage from './assets/components/UserPage';
import { UserContext } from './assets/components/UserProvider';
import Admin from './assets/components/Admin/Admin';
import AdminDash from './assets/components/Admin/AdminDash';
import AssignedTasks from './assets/components/Admin/AssignedTasks';
import { AdminSign } from './assets/components/Admin/AdminSign';
import TaskCard from './assets/components/Admin/TaskCard';
import LandingPage from './assets/components/LandingPage';
import { ContactUs } from './assets/components/ContactUs';

// const Protectedroute = ({children})=>{

//   if(localStorage.getItem("userData")){
//     return children
//   }
//   else{
//     return <Signup/>
//   } 

// }

function App() {
  // const [count, setCount] = useState(0)
  return (
    <>

     <Routes>
      <Route path="/land" element={<LandingPage/>} />
      <Route path="/" element={<Signup />} />
      {/* <Route path="/" element={<TaskCard/>} /> */}
      
      <Route path="/login" element={<Login />} />
      <Route path="/user/:userId" element={<UserPage />} />
      <Route path='/adminSign' element={<AdminSign/>}/>
      <Route path='/admindash/:adminId' element={<AdminDash/>}/>
      <Route path='/assignedTask' element={<AssignedTasks/>}></Route>
      <Route path='/adminsignup' element={<Signup/>}/>
      <Route path='/adminlogin' element={<Admin/>}/>
      <Route path='/Contact' element={<ContactUs/>}/>
     </Routes>
     
    </>
  )
}

export default App
