const sendMail = require("../config/mail");

const SubmitForm = async (req, res) => {
  try {
    const { fullname, email, phone, message } = req.body;

    if (!fullname || !email || !phone || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    await sendMail(
      process.env.EMAIL_ID,
      "New Hotel Booking Feedback Received",
      `<h2>New Hotel Booking Feedback</h2>
            <p><strong>Name:</strong> ${fullname}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong> ${message}</p>`
    );

    await sendMail(
      email,
      "Thank You for Your Feedback!",
      `<h2>Thank You, ${fullname}!</h2>
            <p>We appreciate your feedback. Our team will get back to you soon.</p>
            <p>Best regards,<br>Hotel Booking Team</p>`
    );

    res.status(200).json({ message: "Feedback submitted successfully." });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ error: "Failed to submit feedback." });
  }
};

module.exports = { SubmitForm };
