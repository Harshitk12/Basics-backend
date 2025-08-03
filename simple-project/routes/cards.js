const express = require("express");
const router = express.Router();
const Card = require("../models/Card");
const authenticateToken = require("../middleware/auth");

// Get all cards
router.get("/",authenticateToken, async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cards", error: err });
  }
});

// (Optional) Create a new card - for testing
router.post("/",authenticateToken, async (req, res) => {
  const { title, description, image, body } = req.body;
  try {
    const newCard = new Card({ title, description, image, body });
    await newCard.save();
    res.status(201).json({ message: "Card created", card: newCard });
  } catch (err) {
    res.status(500).json({ message: "Error creating card", error: err });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  const cardId = req.params.id;

  const card = await Card.findOneAndDelete({ _id: cardId});

  if (!card) return res.status(404).json({ message: "Card not found" });

  res.json({ message: "Card deleted successfully" });
});


module.exports = router;
