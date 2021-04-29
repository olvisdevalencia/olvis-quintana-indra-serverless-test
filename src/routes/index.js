const express = require("express");
const router = express();

const healthRouter = require("./health");
const peopleRouter = require("./personas");
const swapiRouter = require("./swapi");
const swagger = require("./swagger");

router.use("/health", healthRouter);
router.use("/personas", peopleRouter);
router.use("/swapi", swapiRouter);
router.use("/swagger", swagger);

module.exports = router;
