const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./utils/db")
const { setupSecurity } = require("./middleware/security")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// security middleware
setupSecurity(app)

// parse incoming json
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// connect to database
connectDB()

// routes
app.use("/api/v1/auth", require("./routes/auth"))

// health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" })
})

// global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err.stack)
  res.status(500).json({ message: "Internal server error" })
})

app.listen(PORT, () => {
  console.log(`TripSathi server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`)
})

module.exports = app