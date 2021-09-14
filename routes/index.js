const router = require("express").Router();
const apiRoutes = require("./api");

apiRoutes.use("/api", apiRoutes);

module.exports = router;