const { Router } = require("express");

const router = new Router();

router.get("/", (req, res) => {
  res.sendFile("./index.html", { root: "./views" });
});

module.exports = router;
