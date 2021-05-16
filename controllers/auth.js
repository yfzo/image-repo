const createError = require("http-errors");
const bcrypt = require("bcrypt");

const loginUser = (req, res, next) => {
  if (req.body.remember) {
    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000 // 30 days
  } else {
    req.session.cookie.expires = false; // expire at end of session
  }
  res.send("logged in");
};

const registerUser = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    const db = req.app.locals.db;

    await db.query(
      `INSERT INTO users(first_name, last_name, email, password) VALUES ($1, $2, $3, $4)`,
      [firstName, lastName, email, hashedPwd]
    );

    res.send("registered");
  } catch (error) {
    console.log(error);
    next(createError(400));
  }
};

module.exports = {
  loginUser,
  registerUser,
};
