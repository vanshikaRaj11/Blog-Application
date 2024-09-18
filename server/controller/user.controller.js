const User = require("../model/user.model");
const bcrypt = require("bcrypt");

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

module.exports = { signUp };
