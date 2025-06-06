import jwt from "jsonwebtoken";

export const generateToken = (email, password) => {
  const token = jwt.sign({ email, password }, process.env.JWT_SECRET, { expiresIn: '7d' });

  return token
}