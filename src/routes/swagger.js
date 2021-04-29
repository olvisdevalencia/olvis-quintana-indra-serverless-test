const express = require("express");
const router = express();
const swaggerUI = require("swagger-ui-express");
const swaggerConfig = require("../config/swagger");

router.use("/api-docs/", swaggerUI.serveWithOptions({ redirect: false }));
router.get("/api-docs/", swaggerUI.setup(swaggerConfig));

module.exports = router;
