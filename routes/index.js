const router = require("express").Router();

router.use("/customer", require("./customer"));
router.use("/movie", require("./movie"));

module.exports = router;
