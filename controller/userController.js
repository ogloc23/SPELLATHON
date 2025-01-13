const User = require("../models/userModel");
const {
  sendNotificationEmail,
  sendUserSuccessEmail,
} = require("../services/emailService");

const registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    //Email Notification
    await sendNotificationEmail(user);

    //User Notification
    await sendUserSuccessEmail(user);

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

module.exports = { registerUser };
