import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Get Bearer token

  if (!token) {
    return res.status(401).json({ msg: "No token provided. Access Denied." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user payload to request
    next(); // Allow the request to continue
  } catch (err) {
    return res.status(403).json({ msg: "Invalid token." });
  }
};
export default verifyToken;