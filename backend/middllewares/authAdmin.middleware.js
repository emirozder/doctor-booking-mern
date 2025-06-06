import jwt from "jsonwebtoken";

export const authAdmin = async (req, res, next) => {
  try {
    // Get token from cookies
    const { token } = req.headers

    // Check if token exists
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded) {
      return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" })
    }
    if (decoded.email + decoded.password !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(403).json({ success: false, message: "Forbidden - Not an Admin" })
    }

    // Call next function (controller)
    next()

  } catch (error) {
    console.log("An error occurred in authAdmin middleware: ", error.message);
    return res.status(500).json({ success: false, message: error.message })
  }
}