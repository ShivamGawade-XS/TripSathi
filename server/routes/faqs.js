const express = require("express")
const router = express.Router()
const faqs = require("../data/mock/faqs.json")

router.get("/", (req, res) => {
  const { category } = req.query
  let results = [...faqs]
  if (category) results = results.filter(f => f.category === category)
  const categories = [...new Set(faqs.map(f => f.category))]
  res.json({ faqs: results, categories, count: results.length })
})

module.exports = router
