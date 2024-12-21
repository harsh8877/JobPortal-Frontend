import React from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { Routes, Route } from'react-router-dom'
import Home from './Pages/Home'
import Jobs from './Pages/Jobs'
import Login from './Pages/Login'
import Jobdetails from './Pages/Jobdetails';
import Register from './Pages/Register';
import Admin from './Pages/Admin';
import Dashboardjob from './Component/Dashboardjob'
import Jobcard from './Component/Jobcard';
import Applyjob from './Component/Applyjob';
import Logout from './Pages/Logout';

const App = () => {
  return (
    <>
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/jobs' element={<Jobs />} />
      <Route exact path='/jobdetails' element={<Jobdetails />} />
      <Route exact path='/applyjob' element={<Applyjob />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/register' element={<Register />} />
      <Route exact path='/admin' element={<Admin />} />
      <Route exact path='/dashboardjob' element={<Dashboardjob />} />
      <Route exact path='/jobcard' element={<Jobcard />} />
      <Route exact path='/logout' element={<Logout />} />
    </Routes>

    </>
  )
}

export default App
