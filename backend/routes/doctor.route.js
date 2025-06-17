import express from 'express';
import { doctorLogin, getAllDoctors } from '../controllers/doctor.controller.js';

const doctorRouter = express.Router();

doctorRouter.post('/login', doctorLogin)
doctorRouter.get('/get-all-doctors', getAllDoctors)

export default doctorRouter;