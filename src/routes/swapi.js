const express = require("express");
const router = express();
const { swapiController } = require("../controllers");

router.get("/personas", swapiController.getPeople);
router.get("/personas/:id", swapiController.getPersonById);

module.exports = router;
