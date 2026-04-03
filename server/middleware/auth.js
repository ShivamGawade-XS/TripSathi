const jwt = require("jsonwebtoken")
const User = require("../models/User")

const protect = async (req, res, next) => {
  let token = null

  // check for bearer token in header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (process.env.USE_MOCK_API === "true") {
      req.user = { _id: "mock-user-123", name: "Demo User", email: "demo@tripsathi.com", language: "en" }
      return next()
    }

    req.user = await User.findById(decoded.id).select("-passwordHash")

    if (!req.user) {
      return res.status(401).json({ message: "User not found" })
    }

    next()
  } catch (error) {
    console.error("Auth middleware error:", error.message)
    return res.status(401).json({ message: "Not authorized, token invalid" })
  }
}

// generate jwt token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  })
}

module.exports = { protect, generateToken }