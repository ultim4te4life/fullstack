const Note = require("../../models/note");

const createNewNote = async (req, res) => {
  const { title, content, category } = req.body;

  try {
    if (!title || !content || !category) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const note = await Note.create({
      title,
      content,
      category,
    });

    res.status(201).json({ note });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createNewNote,
};
