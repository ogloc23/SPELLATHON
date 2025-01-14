const User = require("../models/userModel");
// const {
//   sendNotificationEmail,
//   sendUserSuccessEmail,
// } = require("../services/emailService");

// const registerUser = async (req, res) => {
//   try {
//     const {
//       name,
//       age,
//       school,
//       grade,
//       parentName,
//       contactNumber,
//       city,
//       email,
//       source,
//       additionalComments,
//       pictureUrl,
//     } = req.body;

//     if (
//       !name ||
//       !age ||
//       !school ||
//       !grade ||
//       !parentName ||
//       !contactNumber ||
//       !city ||
//       !email ||
//       !pictureUrl
//     ) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     const newUser = await User.create({
//       name,
//       age,
//       school,
//       grade,
//       parentName,
//       contactNumber,
//       city,
//       email,
//       source,
//       additionalComments,
//       pictureUrl,
//     });

//     // Notify admin
//     await sendNotificationEmail(newUser);

//     // Welcome email to user
//     await sendUserSuccessEmail(newUser.email);

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "Error registering user", error: error.message });
//   }
// };

// module.exports = { registerUser };

const {
  sendNotificationEmail,
  sendUserSuccessEmail,
} = require("../services/emailService");

const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      age,
      school,
      grade,
      parentName,
      contactNumber,
      city,
      source,
      pictureUrl,
      additionalComments,
    } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Save user details to the database
    const newUser = await User.create({
      name,
      email,
      age,
      school,
      grade,
      parentName,
      contactNumber,
      city,
      source,
      pictureUrl,
      additionalComments,
    });

    // Send notification email to admin
    await sendNotificationEmail(newUser);

    // Send success email to user
    await sendUserSuccessEmail(newUser);

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

module.exports = { registerUser };
