exports.create = async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
