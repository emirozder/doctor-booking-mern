import bcrypt from "bcrypt";
import { v2 as cloudinary } from 'cloudinary';
import validator from "validator";
import Doctor from "../models/doctor.model.js";

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
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
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
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
}

