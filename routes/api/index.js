const router = require("express").Router();
const articleRoutes = require("./article");

// Article routes
router.use("/article", articleRoutes);

module.exports = router;
