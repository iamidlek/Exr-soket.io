const router = require("express").Router();
const User = require("../models/User");

// register
router.get("/register", async (req, res) => {
  const user = await new User({
    username: "test",
    email: "test@gamil.com",
    password: "abc123456",
  });

  await user.save();
  res.send("OK");
});

module.exports = router;
