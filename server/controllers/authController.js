const User = require("../models/User")
const { generateToken } = require("../middleware/auth")

// register new user
// POST /api/v1/auth/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, language } = req.body

    // check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" })
    }

    const user = await User.create({
      name,
      email,
      passwordHash: password,
      language: language || "en",
    })

    const token = generateToken(user._id)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      language: user.language,
      token,
    })
  } catch (error) {
    console.error("Register error:", error.message)
    res.status(500).json({ message: "Server error during registration" })
  }
}

module.exports = { registerUser }