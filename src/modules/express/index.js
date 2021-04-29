const axios = require("axios");
const express = require("express");
const { StatusCodes } = require("http-status-codes");

const app = express();

const router = require("../../routes");

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res, next) => {
  let { data } = await axios
    .get("https://swapi.dev/api/people")
    .then((data) => {
      console.log("llego o no llego ?");
      data.data.results.filter((data) => {
        return {
          nombre: data.name,
        };
      });

      return data;
    });
  console.log("esta es la data que trae esto XD lpm");
  return res.status(StatusCodes.OK).send(data);

  /* return res.status(StatusCodes.OK).json({
    message: "Hello indra recruiter!",
  }); */
});

app.get("/hello", (req, res, next) => {
  return res.status(StatusCodes.OK).json({
    message: "I know you will be here!",
  });
});

app.use("/api", router);

app.use((req, res, next) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    error: "Route Not Found",
  });
});

module.exports = app;
