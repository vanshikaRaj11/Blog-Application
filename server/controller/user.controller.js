const User = require("../model/user.model");
const signUp = async (req, res) => {
  try {
    const user = req.body;
    const newUser = new User(user);
    await newUser.save();
    return res.status(200).json({
      data: newUser,
      code: 200,
      message: "You have been sign up successfully",
    });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      message: "Error while sign up",
    });
  }
};
module.exports = { signUp };
