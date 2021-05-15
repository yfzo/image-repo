const bcrypt = require("bcrypt");

const loginUser = (req, res, next) => {
  res.send("logged in");
};

const registerUser = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  console.log("req body:", req.body);
  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    const client = req.app.locals.db;

    await client.query(
      `INSERT INTO users(first_name, last_name, email, password) VALUES ($1, $2, $3, $4)`,
      [firstName, lastName, email, hashedPwd]
    );

    res.send("registered");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  loginUser,
  registerUser,
};
