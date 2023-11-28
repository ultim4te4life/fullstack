const Note = require("../../models/note");
const mongoose = require("mongoose");

const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid note ID" });
  }

  const note = await Note.findOneAndDelete({ _id: id });

  if (!note) {
    res.status(404).json({ message: "Note not found" });
    return;
  }

  res.status(200).json({ message: "Note deleted successfully" });
};

module.exports = { deleteNote };
