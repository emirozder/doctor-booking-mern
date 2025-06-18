import express from 'express';
import { cancelAppointment, completeAppointment, doctorDashboard, doctorLogin, getAllDoctors, getDoctorAppointments } from '../controllers/doctor.controller.js';
import { authDoctor } from '../middllewares/authDoctor.middleware.js';

const doctorRouter = express.Router();

doctorRouter.post('/login', doctorLogin)
doctorRouter.get('/get-all-doctors', getAllDoctors)
doctorRouter.get('/get-doctor-appointments', authDoctor, getDoctorAppointments)
doctorRouter.post('/cancel-appointment', authDoctor, cancelAppointment)
doctorRouter.post('/complete-appointment', authDoctor, completeAppointment)
doctorRouter.get('/doctor-dashboard', authDoctor, doctorDashboard)

export default doctorRouter;