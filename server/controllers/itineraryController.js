const Itinerary = require("../models/Itinerary")
const crypto = require("crypto")

// create new itinerary
// POST /api/v1/itinerary
const createItinerary = async (req, res) => {
  try {
    const { title, from, to, travelDate, transport, hotels } = req.body

    if (!title || !from || !to || !travelDate) {
      return res.status(400).json({ message: "Title, from, to, and travelDate are required" })
    }

    // generate a share token
    const shareToken = crypto.randomBytes(16).toString("hex")

    const itinerary = await Itinerary.create({
      userId: req.user._id,
      title,
      from,
      to,
      travelDate: new Date(travelDate),
      transport: transport || [],
      hotels: hotels || [],
      shareToken,
    })

    res.status(201).json(itinerary)
  } catch (error) {
    console.error("Create itinerary error:", error.message)
    res.status(500).json({ message: "Failed to create itinerary" })
  }
}

// get user's itineraries
// GET /api/v1/itinerary
const getMyItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50)

    res.json(itineraries)
  } catch (error) {
    console.error("Get itineraries error:", error.message)
    res.status(500).json({ message: "Failed to fetch itineraries" })
  }
}

// get single itinerary by id
// GET /api/v1/itinerary/:id
const getItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({
      _id: req.params.id,
      userId: req.user._id,
    })

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" })
    }

    res.json(itinerary)
  } catch (error) {
    console.error("Get itinerary error:", error.message)
    res.status(500).json({ message: "Failed to fetch itinerary" })
  }
}

// delete itinerary
// DELETE /api/v1/itinerary/:id
const deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    })

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" })
    }

    res.json({ message: "Itinerary deleted" })
  } catch (error) {
    console.error("Delete itinerary error:", error.message)
    res.status(500).json({ message: "Failed to delete itinerary" })
  }
}

// get shared itinerary by token (public route)
// GET /api/v1/itinerary/shared/:token
const getSharedItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({
      shareToken: req.params.token,
    }).select("-userId")

    if (!itinerary) {
      return res.status(404).json({ message: "Shared itinerary not found" })
    }

    res.json(itinerary)
  } catch (error) {
    console.error("Get shared itinerary error:", error.message)
    res.status(500).json({ message: "Failed to fetch shared itinerary" })
  }
}

module.exports = {
  createItinerary,
  getMyItineraries,
  getItinerary,
  deleteItinerary,
  getSharedItinerary,
}
