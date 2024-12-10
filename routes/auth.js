const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("hello from auth");
});

module.exports = router;
