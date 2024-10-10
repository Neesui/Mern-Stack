const User = require('../models/userModel');
const Token = require('../models/tokenModel');
const crypto = require('crypto');
const send = require("../utils/send");

// Register user
exports.postUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                error: "Email is already registered. Please try another or try to login.",
            });
        }

        // Create a new user
        const user = new User({
            name,
            email,
            password,
        });

        // Save the user to the database
        await user.save();

        // Generate token
        let token = new Token({
            token: crypto.randomBytes(16).toString('hex'),
            userId: user._id
        });

        token = await token.save();
        if (!token) {
            return res.status(400).json({ error: 'Unable to create token' });
        }

        // Send email
        await send(
            email,
            token.token // Pass email and token to send() function
        );

        // Respond to client
        res.json({
            message: `An email has been sent to ${email}. Follow the instructions to activate your account.`,
        });
    } catch (err) {
        console.log("SIGNUP EMAIL ERROR", err);
        return res.status(400).json({
            message: err.message,
        });
    }
};
