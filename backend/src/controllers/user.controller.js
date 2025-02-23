const { createUserService } = require("../utils/userService");

const createUser = async (req, res) => {
  const { name, email, password, watchList } = req.body;
  const data = await createUserService(name, email, password, watchList);
  return res.status(200).json(data);
};

module.exports = {
  createUser,
};
