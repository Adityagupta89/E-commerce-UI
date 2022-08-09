import React from 'react'
import { Navigate,Outlet } from 'react-router-dom';
const AdminRoute = () => {
    let admin=localStorage.getItem('isAdmin');
    // console.log(auth)
  return (
    admin?<Outlet/>:<Navigate to='/'/>
  )
}

export default AdminRoute