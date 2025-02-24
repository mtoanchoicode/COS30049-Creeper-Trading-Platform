const transporter = require("../config/mailer");
require("dotenv").config();

exports.sendEmail = async (req, res) => {
    const { useremail } = req.body;

    if (!useremail || !useremail.email) {
        return res.status(400).json({ message: "Email is required" });
    }

    //email details
    const mailOptions = {
        from: process.env.EMAIL_USER,  // Creeper email from .env
        to: useremail,  // The user's email
        subject: "Subscription Confirmation",
        text: "Thank you for subscribing to Creeper! 🎉, we happy to share the latest infomation with you !!! 📝",
        attachment: [{
            filename: "Creeper logo", 
            path: "../../../frontend/src/assets/Logo.png"
        }]
    };

    // send the email with nodemailer
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully - Check your email !!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Email sending failed 😫 - Try again later" });
    }
}
