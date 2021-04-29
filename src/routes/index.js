const express = require("express");
const router = express();

const healthRouter = require("./health");
const peopleRouter = require("./personas");
const swagger = require("./swagger");

router.use("/health", healthRouter);
router.use("/personas", peopleRouter);
router.use("/swagger", swagger);

module.exports = router;
