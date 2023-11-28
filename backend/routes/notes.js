const express = require("express");
const router = express.Router();
const {
  createNewNote,
  getAllNote,
  getSingleNote,
  updateNote,
  deleteNote,
} = require("../controllers/note");

// GET /notes - Get all notes
router.get("/", getAllNote);

// GET /notes/:id - Get a single note by ID
router.get("/:id", getSingleNote);

// POST /notes - Create a new note
router.post("/", createNewNote);

// PUT /notes/:id - Update a note by ID
router.put("/:id", updateNote);

// DELETE /notes/:id - Delete a note by ID
router.delete("/:id", deleteNote);

module.exports = router;
