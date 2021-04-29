const express = require("express");
const router = express();
const { swapiController } = require("../controllers");

router.get("/", swapiController.getPeople);
router.get("/:id", swapiController.getPersonById);

module.exports = router;
