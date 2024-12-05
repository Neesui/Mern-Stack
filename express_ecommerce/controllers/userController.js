const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/setEmail");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");

// to register user
exports.postUser = async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // check if the email is already registered or not
  User.findOne({ email: user.email }).then(async (data) => {
    if (data) {
      return res
        .status(400)
        .json({ error: "Email is already registered . Please try again" });
    } else {
      user = await user.save();
      if (!user) {
        return res.status(400).json({ error: "unable to register user" });
      }

      // generate token
      let token = new Token({
        token: crypto.randomBytes(16).toString("hex"),
        userId: user._id,
      });
      token = await token.save();
      if (!token) {
        return res.status(400).json({ error: "unable to create token" });
      }
      // send email to user
      sendEmail({
        from: "no-reply@ecommerce.com",
        to: user.email,
        subject: "Verify your email",
        text: `hello , \n\n please verify your email by clicking the link below \n\n 
        http:\/\/${req.headers.host}\/api\/confirmation\/${token.token}
        `, //http://localhost:8000/api/confirmation/1234567
      });
      res.send(user);
    }
  });
};

// post email confirmation
exports.postEmailConfirmation = (req, res) => {
  // at first find the valid or matching token
  Token.findOne({
    token: req.params.token,
  })
    .then((token) => {
      if (!token) {
        return res
          .status(400)
          .json({ error: "Invalid token or token may have expired" });
      }

      // if we find the valid token then find the valid user for that token
      User.findOne({ _id: token.userId }).then((user) => {
        if (!user) {
          return res
            .status(400)
            .json({ error: "we are unable to find valid user for that token" });
        }

        // to check if the user is already verified or not
        if (user.isVerified) {
          return res.status(400).json({
            error: "Email is already verified user",
          });
        }

        // save and verify user
        user.isVerified = true;
        user
          .save()
          .then((user) => {
            if (!user) {
              return res.status(400).json({
                error: "fail to verify email",
              });
            }
            res.json({ message: "your email has been verified successfully" });
          })
          .catch((err) => {
            return res.status(400).json({
              error: err,
            });
          });
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};

// signin process

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  // email = req.body.email

  // at first check if the email is registered or not

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      error:
        "sorry the email you have provided is not found in out system , please register first",
    });
  }
  // if email is found then check the password for that email
  if (!user.authenticate(password)) {
    return res.status(400).json({ error: "email and password did not match" });
  }

  if (!user.isVerified) {
    return res.status(400).json({ error: "verify email first to continue" });
  }

  // now generate token with user is,role,and jwt secret
  const token = jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET
  );

  // store token into cookie
  res.cookie("myCookie", token, { expire: Date.now() + 99999 });

  // return user information to frontend
  const { _id, name, role } = user;

  res.json({ token, user: { name, role, email, _id } });
};

// forget password
exports.forgetPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(400)
      .json({ error: "email you have provided is not found in our system" });
  }

  // generate token
  let token = new Token({
    token: crypto.randomBytes(16).toString("hex"),
    userId: user._id,
  });
  token = await token.save();
  if (!token) {
    return res.status(400).json({ error: "unable to create token" });
  }
  // send email to user
  sendEmail({
    from: "no-reply@ecommerce.com",
    to: user.email,
    subject: "password reset link",
    text: `hello , \n\n please reset your password by clicking the link below \n\n 
    http:\/\/${req.headers.host}\/api\/resetpassword\/${token.token}
    `, //http://localhost:8000/api/confirmation/1234567
  });

  res.json({ message: "password reset link has been sent successfully" });
};

// reset password
exports.resetPassword = async (req, res) => {
  // find the valid token
  let token = await Token.findOne({ token: req.params.token });

  if (!token) {
    return res.status(400).json({
      error: "invalid token or token has been expired",
    });
  }
  // if we find the valid token, then find the valid user for that token
  let user = await User.findOne({ _id: token.userId });
  if (!user) {
    return res
      .status(400)
      .json({ error: "we are unable to find the valid user for this token." });
  }

  user.password = req.body.password;
  user = await user.save();
  if (!user) {
    return res.status(400).json({
      error: "unable to reset  password",
    });
  }

  res.json({
    message: "password has been reset successfully. login to continue",
  });
};

// userlists
exports.userList = async (req, res) => {
  let user = await User.find().select("-hashed_password").select("-salt");
  if (!user) {
    return res
      .status(400)
      .json({ error: "no user found, something went wrong" });
  }
  res.send(user);
};

// userdetail
exports.userDetails = async (req, res) => {
  console.log(req.params.id);

  let user = await User.findById(req.params.id)
    .select("-hashed_password")
    .select("-salt");
  if (!user) {
    return res
      .status(400)
      .json({ error: "user not found, something went wrong" });
  }
  res.send(user);
};

// signout
exports.signout = (req, res) => {
  res.clear("myCookie");
  res.json({
    message: "signout success",
  });
};

// require signin
exports.requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

// middleware for user role
exports.requireUser = (req, res, next) => {
  expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  })(req, res, (err) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "you are not authorized to access" });
    }
    // check the role
    if (req.user.role === 0) {
      next();
    } else {
      return res.status(400).json({
        error: "Forbidden",
      });
    }
  });
};
// middleware for admin role
exports.requireAdmin = (req, res, next) => {
  expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  })(req, res, (err) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "you are not authorized to access" });
    }
    // check the role
    if (req.user.role === 1) {
      next();
    } else {
      return res.status(400).json({
        error: "Forbidden",
      });
    }
  });
};
