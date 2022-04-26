const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// register
module.exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  // kiem tra xem trong db co user chua
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      success: false,
      message: "user is already existed",
    });
  }

  // chua co user trong db

  // hash password
  const salt = bcrypt.genSaltSync(12);

  const hashedPassword = bcrypt.hashSync(password, salt);
  const savedUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (!savedUser) {
    return res.status(400).json({
      success: false,
      message: "can not save user",
    });
  }

  res.json({
    success: true,
    user: savedUser,
  });
};

// login
module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // kiem tra email co tren db
  const dbUser = await User.findOne({ email });

  if (!dbUser) {
    return res.status(404).json({
      success: false,
      message: "user is not found!",
    });
  }

  // so sanh 2 password
  const isMatch = bcrypt.compareSync(password, dbUser.password);

  if (!isMatch) {
    return res.status(404).json({
      success: false,
      message: "password is incorrect!",
    });
  }

  const payload = {
    id: dbUser._id,
    email: dbUser.email,
    username: dbUser.username,
  };

  const token = jwt.sign(payload, "thay-nhat-dep-trai", {
    expiresIn: "2h",
  });

  res.json({
    success: true,
    token,
    user: payload,
  });
};

// get me
module.exports.getCurrentUser = (req, res, next) => {
  const headers = req.headers.authorization || "";
  const token = headers.split(" ")[1];

  try {
    if (token) {
      const payload = jwt.verify(token, "thay-nhat-dep-trai");
      if (payload) {
        res.json({
          success: true,
          user: payload,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "token is invalid",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "token is invalid",
    });
  }
};
