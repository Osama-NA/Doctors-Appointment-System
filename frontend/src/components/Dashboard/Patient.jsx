import React from 'react'
import { Routes, Route } from "react-router-dom";
import Overview from './Overview/Overview'
import Doctors from './Doctors/Doctors'
import Appointments from './Appointments/Appointments'
import Profile from './Profile/Profile'

const Patient = () => {
  return (
    <div className='pages-wrapper'>
      <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default Patient