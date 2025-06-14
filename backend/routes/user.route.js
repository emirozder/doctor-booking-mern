import express from 'express';
import { bookAppointment, updateProfile, userLogin, userRegister } from '../controllers/user.controller.js';
import { authUser } from '../middllewares/authUser.middleware.js';
import upload from '../middllewares/multer.js';


const userRouter = express.Router();

userRouter.post('/register', userRegister)
userRouter.post('/login', userLogin)
userRouter.post('/update-profile', authUser, upload.single('image'), updateProfile)
userRouter.post('/book-appointment', authUser, bookAppointment)

export default userRouter;