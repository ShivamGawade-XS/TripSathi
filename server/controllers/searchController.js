const { getMockTransport } = require("../services/mockService")
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

    // for now, using mock data
    const results = getMockTransport(from, to)

    // log search history (non-blocking)
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

module.exports = { searchTransport }