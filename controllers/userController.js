const { getUserDataFromDb } = require('../models/userModel');

const getUserData = async (req, res) => {
  const userId = req.user.id;

  try {
    const userData = await getUserDataFromDb(userId);
    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
};

module.exports = { getUserData };
