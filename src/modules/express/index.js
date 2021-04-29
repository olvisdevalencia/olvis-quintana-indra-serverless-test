const express = require("express");
const { StatusCodes } = require("http-status-codes");

const app = express();

const router = require("../../routes");

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res, next) => {
  return res.status(StatusCodes.OK).json({
    message:
      "Por favor verificar la documentación en: [host]/api/swagger/api-docs/",
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(StatusCodes.OK).json({
    message:
      "Por favor verificar la documentación en: [host]/api/swagger/api-docs/",
  });
});

app.use("/api", router);

app.use((req, res, next) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    error: "Route Not Found",
  });
});

module.exports = app;
