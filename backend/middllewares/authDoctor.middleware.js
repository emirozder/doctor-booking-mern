import jwt from "jsonwebtoken";

export const authDoctor = async (req, res, next) => {
  try {
    // Get token from cookies
    const { token } = req.headers;

    // Check if token exists
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
    }

    // Attach user ID to request object
    req.docId = decoded.id;

    // Call next function (controller)
    next();

  } catch (error) {
    console.log("An error occurred in authDoctor middleware: ", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
}