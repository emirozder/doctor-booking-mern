import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import connectCloudinary from './config/cloudinary.js';
import connectDB from './config/mongodb.js';
import adminRouter from './routes/admin.route.js';

// app config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.get('/', (req, res) => {
  res.status(200).send('API WORKING');
});
app.use('/api/admin', adminRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});