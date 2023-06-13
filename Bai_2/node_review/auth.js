const express = require("express");
const { connectToDb, db } = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Đăng nhập
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra xem tên người dùng có tồn tại trong cơ sở dữ liệu không
  const user = await db.users.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "Tên người dùng không tồn tại" });
  }

  // Kiểm tra mật khẩu
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Mật khẩu không chính xác" });
  }

  // Tạo mã thông báo
  const payload = { user: { id: user._id } };
  jwt.sign(
    payload,
    "your_secret_key",
    { expiresIn: "1h" },
    (error, token) => {
      if (error) throw error;
      res.json({ token });
    }
  );
});

// Xác thực mã thông báo
function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ message: "Không có mã thông báo" });
  }

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Mã thông báo không hợp lệ" });
  }
}

// Lấy thông tin người dùng hiện tại
router.get("/user", auth, async (req, res) => {
  try {
    const user = await db.users.findOne({ _id: req.user.id });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy thông tin người dùng" });
  }
});

module.exports = router;