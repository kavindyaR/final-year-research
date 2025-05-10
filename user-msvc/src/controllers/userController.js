const { getUserById, getAllUsers } = require("../services/userService");

exports.fetchUserData = async (req, res) => {
  try {
    const { id } = req.query;
    let response = null;

    if (id) {
      response = await getUserById(id);
    } else {
      response = await getAllUsers();
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
