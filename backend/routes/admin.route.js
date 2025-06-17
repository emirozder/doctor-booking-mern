import express from 'express';
import { addDoctor, adminDashboard, cancelAppointment, getAllAppointments, getAllDoctors, loginAdmin } from '../controllers/admin.controller.js';
import { changeAvailability } from '../controllers/doctor.controller.js';
import { authAdmin } from '../middllewares/authAdmin.middleware.js';
import upload from '../middllewares/multer.js';

const adminRouter = express.Router();

adminRouter.post('/login', loginAdmin)
adminRouter.get('/get-all-doctors', authAdmin, getAllDoctors)
adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/change-availability', authAdmin, changeAvailability)
adminRouter.get('/get-all-appointments', authAdmin, getAllAppointments)
adminRouter.post('/cancel-appointment', authAdmin, cancelAppointment)
adminRouter.get('/admin-dashboard', authAdmin, adminDashboard)

export default adminRouter;