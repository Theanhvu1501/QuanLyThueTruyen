const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { adminService } = require("../models/adminModel");
const { connect } = require("../connectSql");

const adminCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password is at least 6 characters long." });
      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = {
        email,
        password: passwordHash,
      };

      const admin = await adminService.create(newUser);
      // Then create jsonwebtoken to authentication
      return res.status(200).json({ msg: "Success" });
    } catch (err) {
      return res.status(500).json({ msg: "error" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const pool = await connect;
      const user = await (
        await pool.query(`Select top(1) * from Admin where email = '${email}'`)
      ).recordset[0];
      if (!user) return res.status(400).json({ msg: "User does not exist." });
      const isMatch = await bcrypt.compare(password, user.Password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });
      // If login success , create access token and refresh token
      const accesstoken = createAccessToken({ id: user.Email });
      const refreshtoken = createRefreshToken({ id: user.Email });
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: "Please Login or Register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({ msg: "Please Login or Register" });

        const accesstoken = createAccessToken({ id: user.Email });
        res.json({ accesstoken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addCart: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          cart: req.body.cart,
        }
      );

      return res.json({ msg: "Added to cart" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  history: async (req, res) => {
    try {
      const history = await Payments.find({ user_id: req.user.id });

      res.json(history);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = adminCtrl;
