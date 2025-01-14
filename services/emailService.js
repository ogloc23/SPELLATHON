const nodemailer = require("nodemailer");

const sendNotificationEmail = async (user) => {
  if (!user.email) throw new Error("No recipent email defined");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const message = {
    from: process.env.EMAIL,
    to: process.env.NOTIFY_EMAIL,
    subject: "New User Registration",
    text: `A new user has registerd:
    - Name: ${user.name}
    - Age: ${user.age}
    - School: ${user.school}
    - Grade: ${user.grade}
    - parent Name: ${user.parentName}
    - Contact: ${user.contactNumber}
    - City: ${user.city}
    - Email: ${user.email}
    - Source ${user.source}
    - Picture URL: ${user.pictureUrl}
    - comments: ${user.additionalComments || "N/A"}
    `,
  };

  await transporter.sendMail(message);
};

const sendUserSuccessEmail = async (user) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const message = {
    from: process.env.EMAIL,
    to: user.email, // User's email address
    subject: "Welcome to Spellathon!",
    text: `Hello ${user.name},\n\nThank you for registering for Spellathon!\n\nWe are excited to have you as part of our community.\n\nIf you have any questions or need assistance, feel free to reach out.\n\nBest regards,\nThe Spellathon Team`,
  };

  await transporter.sendMail(message);
};

module.exports = { sendNotificationEmail, sendUserSuccessEmail };
