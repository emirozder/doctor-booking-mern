import bcrypt from "bcrypt";
import { v2 as cloudinary } from 'cloudinary';
import validator from "validator";
import Appointment from "../models/appointment.model.js";
import Doctor from "../models/doctor.model.js";
import User from "../models/user.model.js";
import { generateAdminToken } from "../utils/generateToken.js";

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check for all data to login admin
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    // compare email and password with environment variables
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // create JWT token
    const token = generateAdminToken(email, password);

    // respond with success
    res.status(200).json({ success: true, message: 'Login successful', token: token });

  } catch (error) {
    console.error('Error in loginAdmin:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getAllDoctors = async (req, res) => {
  try {
    // fetch all doctors from database
    const doctors = await Doctor.find({}).select('-password');

    // respond with success
    res.status(200).json({ success: true, message: 'Doctors fetched successfully', data: doctors });

  } catch (error) {
    console.error('Error in getAllDoctors:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file;

    // check for all data to add doctor
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    // validating strong password
    if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 })) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long, with at least one lowercase letter, one uppercase letter, and one number' });
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      folder: 'doctors',
      resource_type: 'image'
    });
    const imageUrl = imageUpload.secure_url;

    // create doctor object
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      image: imageUrl,
      date: Date.now(),
    };

    // save doctor to database
    const newDoctor = new Doctor(doctorData);
    await newDoctor.save();

    res.status(201).json({ success: true, message: 'Doctor added successfully', data: newDoctor });

  } catch (error) {
    console.error('Error in addDoctor:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getAllAppointments = async (req, res) => {
  try {
    // fetch all appointments from database
    const appointments = await Appointment.find({}).sort({ slotDate: 1, slotTime: 1 })

    // respond with success
    res.status(200).json({ success: true, message: 'Appointments fetched successfully', data: appointments });

  } catch (error) {
    console.error('Error in getAllAppointments:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    // check for appointment ID
    if (!appointmentId) {
      return res.status(400).json({ success: false, message: 'Appointment ID is required' });
    }

    // Find the appointment
    const appointmentData = await Appointment.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Check if the appointment is already cancelled
    if (appointmentData.cancelled) {
      return res.status(400).json({ success: false, message: 'Appointment is already cancelled' });
    }

    // Update doctor's slots_booked
    const { doctorId, slotDate, slotTime } = appointmentData;
    const doctorData = await Doctor.findById(doctorId);
    let slots_booked = doctorData.slots_booked;
    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime);
      if (slots_booked[slotDate].length === 0) {
        delete slots_booked[slotDate]; // Remove the date entry if no slots are left
      }
    } else {
      return res.status(400).json({ success: false, message: 'No slots booked for this date' });
    }

    const updatedDoctorData = await Doctor.findByIdAndUpdate(doctorId, { slots_booked }, { new: true });

    // Set appointment as cancelled and set doctor's updated slots_booked
    await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true, docData: updatedDoctorData }, { new: true });

    // respond with success
    res.status(200).json({ success: true, message: 'Appointment cancelled successfully' });

  } catch (error) {
    console.error('Error in cancelAppointment:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const adminDashboard = async (req, res) => {
  try {
    // Fetch total number of users
    const totalUsers = await User.countDocuments({});

    // Fetch total number of doctors
    const totalDoctors = await Doctor.countDocuments({});

    // Fetch total number of appointments
    const totalAppointments = await Appointment.countDocuments({});

    // Latest appointments
    const latestAppointments = await Appointment.find({})
      .sort({ createdAt: -1 })
      .limit(5)

    res.status(200).json({
      success: true,
      message: 'Dashboard data fetched successfully',
      data: {
        totalUsers,
        totalDoctors,
        totalAppointments,
        latestAppointments
      }
    });

  } catch (error) {
    console.error('Error in adminDashboard:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}
