const User = require("../model/user.model");
const Token = require("../model/token.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signUp = async (req, res) => {
  try {
    // Await the salt generation
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create the new user object
    const user = {
      username: req.body.username,
      name: req.body.name,
      password: hashedPassword,
    };

    // Save the user to the database
    const newUser = new User(user);
    await newUser.save();

    // Respond with success
    return res.status(200).json({
      data: newUser,
      code: 200,
      message: "You have signed up successfully",
    });
  } catch (error) {
    console.error(error.message);

    // Respond with an error message
    return res.status(500).json({
      message: "Error during sign up",
      error: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).json({ message: "User name doesn't match" });
  }
  try {
    let match = await bcrypt.compare(req.body.password, user.password);

    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_JWT_SECRET,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_JWT_SECRET
      );

      const newToken = new Token({ token: refreshToken });
      await newToken.save();

      return res.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: user.name,
        username: user.username,
      });
    } else {
      res.status(400).json({ message: "Invalid password" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error during log in",
      error: error.message,
    });
  }
};

module.exports = { signUp, userLogin };
