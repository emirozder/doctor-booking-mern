import jwt from "jsonwebtoken";

export const generateAdminToken = (email, password) => {
  const token = jwt.sign({ email, password }, process.env.JWT_SECRET, { expiresIn: '7d' });

  return token
}

export const generateUserToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

  return token
}