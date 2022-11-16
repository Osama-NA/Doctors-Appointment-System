import React from "react";
import MenuItem from "./MenuItem";

const DoctorMenu = () => {
  return (
    <>
      <MenuItem
        page="Overview"
        path='/dashboard/doctor/overview'
      />
      <MenuItem
        page="Doctors"
        path='/dashboard/doctor/doctors'
      />
      <MenuItem
        page="Bookings"
        path='/dashboard/doctor/bookings'
      />
      <MenuItem
        page="Appointments"
        path='/dashboard/doctor/appointments'
      />
      <MenuItem
        page="Reviews"
        path='/dashboard/doctor/reviews'
      />
      <MenuItem
        page="Profile"
        path='/dashboard/doctor/profile'
      />
    </>
  );
};

export default DoctorMenu;
