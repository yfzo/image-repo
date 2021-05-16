const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

const { loginUser, registerUser } = require("../controllers/auth");

router.get("/login", function (req, res, next) {
  res.send("login");
});

router.post("/login", passport.authenticate("local", { failureRedirect: '/login', successRedirect: '/auth/protected-route' }), loginUser);

router.get("/logout", function (req, res, next) {
  req.logout();
  res.send("logged out");
});

router.get("/register", function (req, res, next) {
  res.send("register");
});

router.post("/register", registerUser);

router.get('/protected-route', (req, res, next) => {
  if (req.isAuthenticated()) {
      res.send('<h1>You are authenticated</h1>');
  } else {
      res.send('<h1>You are not authenticated</h1>');
  }
});

module.exports = router;

passport.use(
  "local",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      const db = req.app.locals.db;

      db.query(`SELECT * FROM users WHERE email=$1`, [username])
        .then(result => {
          const user = result.rows[0];

          if (user == null) {
            return done(null, false);
          } else {
            bcrypt.compare(password, user.password, (err, check) => {
              if (err) {
                return done();
              }
              else if (check) return done(null, { id: user.id });
              else return done(null, false);
            });
          }
        })
        .catch((err) => {
          done(err)
        });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
})