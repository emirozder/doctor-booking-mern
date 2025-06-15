import express from 'express';
import { bookAppointment, getDoctorById, getDoctorsBySpeciality, getUserAppointments, updateProfile, userLogin, userRegister } from '../controllers/user.controller.js';
import { authUser } from '../middllewares/authUser.middleware.js';
import upload from '../middllewares/multer.js';


const userRouter = express.Router();

userRouter.post('/register', userRegister)
userRouter.post('/login', userLogin)
userRouter.post('/update-profile', authUser, upload.single('image'), updateProfile)
userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.get('/get-doctor-by-id/:id', getDoctorById);
userRouter.post('/get-doctors-by-speciality', getDoctorsBySpeciality)
userRouter.get('/get-user-appointments', authUser, getUserAppointments)

export default userRouter;