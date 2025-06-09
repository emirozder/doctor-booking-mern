import express from 'express';
import { addDoctor, getAllDoctors, loginAdmin } from '../controllers/admin.controller.js';
import { authAdmin } from '../middllewares/authAdmin.middleware.js';
import upload from '../middllewares/multer.js';

const adminRouter = express.Router();

adminRouter.post('/login', loginAdmin)
adminRouter.get('/get-all-doctors', authAdmin, getAllDoctors)
adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)

export default adminRouter;