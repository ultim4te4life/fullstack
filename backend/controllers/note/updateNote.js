const Note = require("../../models/note");
const mongoose = require("mongoose");

const updateNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid note ID" });
  }

  const updatedNote = await Note.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!updatedNote) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.status(200).json({ message: "Note updated successfully" });
};

module.exports = { updateNote };
