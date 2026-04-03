const trains = require("../data/mock/trains.json")
const buses = require("../data/mock/buses.json")
const hotels = require("../data/mock/hotels.json")

// normalize city names for matching
const normalize = (city) => city.toLowerCase().trim()

// fetch mock train results
const getMockTrains = (from, to) => {
  return trains.filter(
    (t) =>
      normalize(t.from) === normalize(from) &&
      normalize(t.to) === normalize(to)
  )
}

// fetch mock bus results
const getMockBuses = (from, to) => {
  return buses.filter(
    (b) =>
      normalize(b.from) === normalize(from) &&
      normalize(b.to) === normalize(to)
  )
}

// fetch mock hotel results for destination city
const getMockHotels = (city) => {
  return hotels.filter((h) => normalize(h.city) === normalize(city))
}

// get all transport results (trains + buses)
const getMockTransport = (from, to) => {
  const trainResults = getMockTrains(from, to)
  const busResults = getMockBuses(from, to)
  return [...trainResults, ...busResults]
}

// get all results for unified search
const getMockSearchResults = (from, to) => {
  const transport = getMockTransport(from, to)
  const hotelResults = getMockHotels(to)

  return {
    transport,
    hotels: hotelResults,
    meta: {
      from,
      to,
      transportCount: transport.length,
      hotelCount: hotelResults.length,
      source: "mock",
    },
  }
}

module.exports = {
  getMockTrains,
  getMockBuses,
  getMockHotels,
  getMockTransport,
  getMockSearchResults,
}