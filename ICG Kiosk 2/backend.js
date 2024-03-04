const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Endpoint to handle form submission and send email
app.post("/send-email", (req, res) => {
  const { email, selectedForm } = req.body;

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "ahmedaoomar7@gmail.com", // Your email address
      pass: "ahmed1114", // Your email password
    },
  });

  // Email options
  const mailOptions = {
    from: "ahmedaoomar7@gmail.com",
    to: email,
    subject: "Excuse Form",
    text: `Here is your selected excuse form: ${selectedForm}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
