const express = require('express');
const router = express.Router();

// Simple in-memory session storage to remember conversational state
const sessions = {};

function getSession(id) {
  if (!sessions[id]) sessions[id] = { step: 'IDLE', data: {} };
  return sessions[id];
}

router.post('/chat', (req, res) => {
  const { message, phoneId = 'default_user' } = req.body;
  if (!message) return res.status(400).json({ reply: "I didn't catch that. Could you repeat?" });

  const session = getSession(phoneId);
  const text = message.toLowerCase().trim();

  // Reset command
  if (text === 'reset' || text === 'hi' || text === 'hello') {
    session.step = 'IDLE';
    session.data = {};
    return res.json({ 
      reply: "👋 Hi! I'm TripSathi Bot.\n\nI can help you search and book travel packages, check PNR status, or answer questions.\n\nTry saying: *'Delhi to Mumbai'* or *'Search packages'*"
    });
  }

  // STATE: IDLE
  if (session.step === 'IDLE') {
    if (text.includes('to')) {
      const parts = text.split(' to ');
      if (parts.length === 2) {
        const fromCity = parts[0].replace('train', '').replace('bus', '').trim();
        const toCity = parts[1].replace('train', '').replace('bus', '').trim();
        
        session.step = 'SELECTING_RIDE';
        session.data.from = fromCity;
        session.data.to = toCity;

        return res.json({
          reply: `🚆 Found 3 rides from *${fromCity.toUpperCase()}* to *${toCity.toUpperCase()}*!\n\n1. Rajdhani Express — ₹1,450 (AC 3-Tier)\n   Dep: 16:00 | Arr: 08:35+1\n\n2. Duronto Express — ₹1,280 (Sleeper)\n   Dep: 23:15 | Arr: 15:40+1\n\n3. Mumbai Mail — ₹650 (Sleeper)\n   Dep: 21:30 | Arr: 18:00+1\n\nReply with the *number* to book! 🎫`
        });
      }
    }
    
    if (text.includes('pnr')) {
      return res.json({ reply: "🚂 *PNR Status*\n\nPNR: 4521367890\nTrain: 12951 (Rajdhani)\nStatus: *CNF/B4/45* (Confirmed)\nChart: Not Prepared" });
    }

    if (text.includes('package') || text.includes('tour')) {
      return res.json({ reply: "🏝️ *Top Packages*\n\nReply with 'Goa', 'Kerala', or 'Manali' for details!" });
    }

    return res.json({ reply: "I'm not sure how to handle that. Try saying *'Mumbai to Goa'* or *'PNR status'*." });
  }

  // STATE: SELECTING RIDE
  if (session.step === 'SELECTING_RIDE') {
    const choice = parseInt(text);
    if ([1, 2, 3].includes(choice)) {
      session.step = 'BOOKING_DETAILS';
      session.data.train = choice === 1 ? 'Rajdhani Express' : choice === 2 ? 'Duronto Express' : 'Mumbai Mail';
      return res.json({
        reply: `✅ *${session.data.train}* selected!\n\nPassenger details needed:\n• Full Name\n• Age & Gender\n\nReply in format:\n*Name, Age, Gender*\n\nExample: *Raj Kumar, 28, M*`
      });
    }
    return res.json({ reply: "Please reply with 1, 2, or 3 to select your ride, or type 'reset' to start over." });
  }

  // STATE: BOOKING DETAILS
  if (session.step === 'BOOKING_DETAILS') {
    const details = text.split(',');
    if (details.length >= 3) {
      session.step = 'IDLE'; // Reset after booking
      const bookRef = `TS${Math.floor(10000 + Math.random() * 90000)}`;
      return res.json({
        reply: `🎉 *Booking Confirmed!*\n\nReference: *${bookRef}*\nPassenger: ${details[0].trim().toUpperCase()}\nTrain: ${session.data.train}\n\nYour e-ticket will arrive shortly. Type 'reset' to start a new search.`
      });
    }
    return res.json({ reply: "Invalid format. Please reply like: *Raj Kumar, 28, M*" });
  }

  // Fallback
  return res.json({ reply: "Oops, something went wrong. Type 'reset'." });
});

module.exports = router;
