const express = require('express');
const router = express.Router();

const getUserData = require('../controllers/dashboard/getUserData');
const getDoctors = require('../controllers/dashboard/getDoctors');
const getBookings = require('../controllers/dashboard/getBookings');
const getAppointments = require('../controllers/dashboard/getAppointments');

const updateUser = require('../controllers/dashboard/updateUser');
const addSpeciality = require('../controllers/dashboard/addSpeciality');
const bookAppointment = require('../controllers/dashboard/bookAppointment');
const deleteAppointment = require('../controllers/dashboard/deleteAppointment');
const confirmAppointment = require('../controllers/dashboard/confirmAppointment');
const rescheduleAppointment = require('../controllers/dashboard/rescheduleAppointment');

// GET
router.get('/user', getUserData);
router.get('/doctors', getDoctors);
router.get('/bookings', getBookings);
router.get('/appointments', getAppointments);

// POST
router.post('/update-user', updateUser)
router.post('/add-speciality', addSpeciality);
router.post('/book-appointment', bookAppointment);
router.post('/delete-appointment', deleteAppointment)
router.post('/confirm-appointment', confirmAppointment)
router.post('/reschedule-appointment', rescheduleAppointment)

module.exports = router;