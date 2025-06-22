import express from 'express';
import { cancelAppointment, completeAppointment, doctorDashboard, doctorLogin, getAllDoctors, getDoctorAppointments, updateDoctorProfile } from '../controllers/doctor.controller.js';
import { authDoctor } from '../middllewares/authDoctor.middleware.js';
import upload from '../middllewares/multer.js';

const doctorRouter = express.Router();

doctorRouter.post('/login', doctorLogin)
doctorRouter.get('/get-all-doctors', getAllDoctors)
doctorRouter.get('/get-doctor-appointments', authDoctor, getDoctorAppointments)
doctorRouter.post('/cancel-appointment', authDoctor, cancelAppointment)
doctorRouter.post('/complete-appointment', authDoctor, completeAppointment)
doctorRouter.get('/doctor-dashboard', authDoctor, doctorDashboard)
doctorRouter.post('/update-profile', authDoctor, upload.single('image'), updateDoctorProfile)

export default doctorRouter;