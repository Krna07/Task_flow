import React from 'react'
import Admin from './Admin'
import './Admin.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export const AdminSign = () => {
  console.log("AdminSign rendered")

  return (
    <div className='adminsl'>
        <Admin className/>
        <Link to='/adminsignup'><button>SignUp As An Admin</button></Link>
       
    </div>
  )
}
