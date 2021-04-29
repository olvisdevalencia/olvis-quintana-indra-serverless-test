const express = require("express");
const router = express();
const { personasController } = require("../controllers");

router.get("/", personasController.getPeople);
router.post("/", personasController.createPerson);
router.put("/", personasController.updatePerson);
router.get("/:id", personasController.getPersonById);
router.delete("/:id", personasController.deletePerson);

module.exports = router;
