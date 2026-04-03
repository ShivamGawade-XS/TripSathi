const express = require("express")
const router = express.Router()
const { searchTransport } = require("../controllers/searchController")

// GET /api/v1/search/transport
router.get("/transport", searchTransport)

module.exports = router