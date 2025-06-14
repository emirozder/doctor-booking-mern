import bcrypt from "bcrypt";
import { v2 as cloudinary } from 'cloudinary';
import validator from "validator";
import User from "../models/user.model.js";
import { generateUserToken } from "../utils/generateToken.js";

export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Check if email is valid
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

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Generate token
    const token = generateUserToken(user._id); // Uncomment if you want to generate a token

    // return user data without password
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      address: user.address,
      gender: user.gender,
      dob: user.dob,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      __v: user.__v
    };

    res.status(201).json({ success: true, message: 'User registered successfully', token: token, data: userData });
  } catch (error) {
    console.error("Error in User Register", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // check email
    if (email !== user.email) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateUserToken(user._id);

    // return user data without password
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      address: user.address,
      gender: user.gender,
      dob: user.dob,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      __v: user.__v
    };

    res.status(200).json({ success: true, message: 'User logged in successfully', token: token, data: userData });
  } catch (error) {
    console.error("Error in User Login", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const updateProfile = async (req, res) => {
  try {
    // const { name, phone, address, dob, gender } = req.body;
    const userId = req.userId; // Assuming userId is set by authUser middleware
    const imageFile = req.file;

    // Validate input
    // if (!name || !phone || !dob || !gender) {
    //   return res.status(400).json({ success: false, message: 'All fields are required' });
    // }

    // Check if user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // await User.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender }, { new: true });
    // const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    const updatedUser = await User.findByIdAndUpdate(userId, {
      ...req.body, address:
        req.body.address ? JSON.parse(req.body.address) : user.address,
    }, { new: true });

    if (imageFile) {
      // upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        folder: 'doctors',
        resource_type: 'image'
      });
      const imageUrl = imageUpload.secure_url;

      const updatedUser = await User.findByIdAndUpdate(userId, { image: imageUrl }, { new: true });
      return res.status(200).json({ success: true, message: 'Profile updated successfully', data: updatedUser });
    }

    res.status(200).json({ success: true, message: 'Profile updated successfully', data: updatedUser });

  } catch (error) {
    console.error("Error in Update Profile", error);
    res.status(500).json({ success: false, message: error.message });
  }
}