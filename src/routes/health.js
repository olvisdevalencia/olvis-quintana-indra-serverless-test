const express = require("express");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const router = express();


router.get("/", (req, res, next) => {
  try {
    res.status(StatusCodes.OK).send(ReasonPhrases.OK);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
