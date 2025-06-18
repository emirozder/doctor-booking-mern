import bcrypt from 'bcrypt';
import Appointment from '../models/appointment.model.js';
import Doctor from "../models/doctor.model.js";
import { generateDoctorToken } from "../utils/generateToken.js";

export const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    // Check if docId is provided
    if (!docId) {
      return res.status(400).json({ success: false, message: 'Doctor ID is required' });
    }

    // Find the doctor by ID
    const docData = await Doctor.findById(docId);

    // If doctor not found, return an error
    if (!docData) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    // Find the doctor by ID and update their availability
    const doctor = await Doctor.findByIdAndUpdate(
      docId,
      { available: !docData.available },
      { new: true }
    );

    // If update fails, return an error
    if (!doctor) {
      return res.status(500).json({ success: false, message: 'Failed to update doctor availability' });
    }

    // Respond with success and updated doctor data
    res.status(200).json({ success: true, message: 'Availability updated successfully' });

  } catch (error) {
    console.error('Error in changeAvailability:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getAllDoctors = async (req, res) => {
  try {
    // Fetch all doctors from the database
    const doctors = await Doctor.find({}).select(['-password', '-email']);

    // If no doctors found, return an empty array
    if (!doctors || doctors.length === 0) {
      return res.status(404).json({ success: false, message: 'No doctors found', data: [] });
    }

    // Respond with success and the list of doctors
    res.status(200).json({ success: true, message: 'Doctors fetched successfully', data: doctors });

  } catch (error) {
    console.error('Error in getAllDoctors:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Find the doctor by email
    const doctor = await Doctor.findOne({ email });

    // If doctor not found, return an error
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate a token (assuming you have a method for this)
    const token = generateDoctorToken(doctor._id);

    // return the doctor data without password
    const doctorData = {
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      image: doctor.image,
      speciality: doctor.speciality,
      degree: doctor.degree,
      experience: doctor.experience,
      about: doctor.about,
      available: doctor.available,
      fees: doctor.fees,
      address: doctor.address,
      date: doctor.date,
      slots_booked: doctor.slots_booked,
      createdAt: doctor.createdAt,
      updatedAt: doctor.updatedAt,
      __v: doctor.__v
    };

    // Respond with success and the token
    res.status(200).json({ success: true, message: 'Login successful', token: token, data: doctorData });

  } catch (error) {
    console.error('Error in doctorLogin:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getDoctorAppointments = async (req, res) => {
  try {
    const docId = req.docId;

    // Check if docId is provided
    if (!docId) {
      return res.status(400).json({ success: false, message: 'Doctor ID is required' });
    }

    // Find the appointments for the doctor
    const appointments = await Appointment.find({ doctorId: docId }).sort({ slotDate: 1, slotTime: 1 })

    // respond with success and the list of appointments
    res.status(200).json({ success: true, message: 'Appointments fetched successfully', data: appointments });

  } catch (error) {
    console.error('Error in getDoctorAppointments:', error);
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

export const completeAppointment = async (req, res) => {
  try {
    const docId = req.docId;
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

    // Check if the appointment is already completed
    if (appointmentData.isCompleted) {
      return res.status(400).json({ success: false, message: 'Appointment is already completed' });
    }

    // Check if the appointment is cancelled
    if (appointmentData.cancelled) {
      return res.status(400).json({ success: false, message: 'Cannot complete a cancelled appointment' });
    }

    // Check if the appointment belongs to the doctor
    if (appointmentData.doctorId !== docId) {
      return res.status(403).json({ success: false, message: 'You do not have permission to complete this appointment' });
    }

    // Update the appointment to mark it as completed
    await Appointment.findByIdAndUpdate(appointmentId, { isCompleted: true, payment: true }, { new: true });

    // respond with success
    res.status(200).json({ success: true, message: 'Appointment completed successfully' });

  } catch (error) {
    console.error('Error in completeAppointment:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}