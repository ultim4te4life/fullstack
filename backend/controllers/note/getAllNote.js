const Note = require("../../models/note");

const getAllNote = async (req, res) => {
  try {
    const notes = await Note.find({});

    if (notes.length === 0) {
      return res.status(404).json({ message: "No notes found" });
    }

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getAllNote };
