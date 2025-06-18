import express from 'express';
import { doctorLogin, getAllDoctors, getDoctorAppointments } from '../controllers/doctor.controller.js';
import { authDoctor } from '../middllewares/authDoctor.middleware.js';

const doctorRouter = express.Router();

doctorRouter.post('/login', doctorLogin)
doctorRouter.get('/get-all-doctors', getAllDoctors)
doctorRouter.get('/get-doctor-appointments', authDoctor, getDoctorAppointments)

export default doctorRouter;