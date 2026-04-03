const { getMockTransport, getMockHotels } = require("../services/mockService")
const SearchHistory = require("../models/SearchHistory")

// search transport options (trains + buses)
// GET /api/v1/search/transport?from=Delhi&to=Mumbai&date=2026-04-10
const searchTransport = async (req, res) => {
  try {
    const { from, to, date } = req.query

    if (!from || !to) {
      return res
        .status(400)
        .json({ message: "From and to cities are required" })
    }

    const results = getMockTransport(from, to)

    // log search (non-blocking)
    SearchHistory.create({
      userId: req.user?._id || null,
      from,
      to,
      date: date ? new Date(date) : new Date(),
      resultsCount: results.length,
    }).catch((err) => console.error("Failed to log search:", err.message))

    res.json({
      results,
      count: results.length,
      query: { from, to, date },
    })
  } catch (error) {
    console.error("Transport search error:", error.message)
    res.status(500).json({ message: "Search failed" })
  }
}

// search hotels in destination city
// GET /api/v1/search/hotels?city=Mumbai&date=2026-04-10
const searchHotels = async (req, res) => {
  try {
    const { city, date, sort } = req.query

    if (!city) {
      return res.status(400).json({ message: "City is required" })
    }

    let results = getMockHotels(city)

    // apply sorting
    if (sort === "price") {
      results.sort((a, b) => a.pricePerNight - b.pricePerNight)
    } else if (sort === "rating") {
      results.sort((a, b) => b.rating - a.rating)
    }

    res.json({
      results,
      count: results.length,
      query: { city, date, sort },
    })
  } catch (error) {
    console.error("Hotel search error:", error.message)
    res.status(500).json({ message: "Hotel search failed" })
  }
}

module.exports = { searchTransport, searchHotels }