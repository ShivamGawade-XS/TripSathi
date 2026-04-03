const Booking = require("../models/Booking")
const crypto = require("crypto")

const createBooking = async (req, res) => {
  try {
    const { type, packageId, from, to, travelDate, returnDate, passengers, totalAmount, transport, hotel, contactEmail, contactPhone, specialRequests } = req.body

    if (!type || !travelDate || !totalAmount) {
      return res.status(400).json({ message: "Type, travel date, and total amount are required" })
    }

    const bookingRef = "TS" + Date.now().toString(36).toUpperCase() + crypto.randomBytes(3).toString("hex").toUpperCase()

    const booking = await Booking.create({
      userId: req.user._id,
      type,
      packageId,
      from,
      to,
      travelDate,
      returnDate,
      passengers: passengers || [],
      totalAmount,
      currency: "INR",
      transport,
      hotel,
      contactEmail,
      contactPhone,
      specialRequests,
      status: "confirmed",
      bookingRef,
    })

    res.status(201).json(booking)
  } catch (error) {
    console.error("Create booking error:", error.message)
    res.status(500).json({ message: "Failed to create booking" })
  }
}

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).sort({ createdAt: -1 })
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" })
  }
}

const getBookingByRef = async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingRef: req.params.ref, userId: req.user._id })
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }
    res.json(booking)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch booking" })
  }
}

module.exports = { createBooking, getMyBookings, getBookingByRef }
