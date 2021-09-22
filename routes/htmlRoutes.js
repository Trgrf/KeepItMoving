const router = require("express").Router();
const path = require("path")
const withAuth = require("../utils/auth");

router.get("/profile", withAuth, async (req, res) => {
    res.sendFile(path.join(__dirname, "../public/profile.html"))
  });
  