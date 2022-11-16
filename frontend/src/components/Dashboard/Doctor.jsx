import React from 'react'
import { Routes, Route } from "react-router-dom";
import Overview from './Overview/Overview'
import Doctors from './Doctors/Doctors'
import Appointments from './Appointments/Appointments'
import Profile from './Profile/Profile'
import Bookings from './Bookings/Bookings'
import Reviews from './Reviews/Reviews'

const Doctor = () => {
  return (
    <div className='pages-wrapper'>
      <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/reviews" element={<Reviews />} />
      </Routes>
    </div>
  )
}

export default Doctor