import express from 'express';
import { getAllDoctors } from '../controllers/doctor.controller.js';

const doctorRouter = express.Router();

doctorRouter.get('/get-all-doctors', getAllDoctors)

export default doctorRouter;