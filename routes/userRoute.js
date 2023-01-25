const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

require("../db/connection");
const User = require("../model/userSchema");

router.get("/", authenticate, (req, res) => {
  res.send("Home from router.js");
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ error: "All fields are mandetory." });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exist." });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      await user.save();

      res.status(201).json({ message: "User registered successfully", user });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  //   console.log(req.body);
  //   res.json("signin success");

  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please filled the data" });
    }
    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin)
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      // console.log("token:", token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 9632500000), //30 days
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials" });
      } else {
        res.json({ message: "User signin successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

// Logout Page
router.get("/logout", (req, res) => {
  // console.log("This is logout");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("Logout Successfully");
});

module.exports = router;
