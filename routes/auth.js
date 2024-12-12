const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER USER
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

// LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(404).json("wrong password");

    const accessToken = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      "mySecretKey"
    );
    res.status(200).json({
      username: user.username,
      email: user.email,
      password: user.password,
      accessToken,
      isAdmin: user.isAdmin,
      profilePicture: user.profilePicture,
      coverPicture: user.coverPicture,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
