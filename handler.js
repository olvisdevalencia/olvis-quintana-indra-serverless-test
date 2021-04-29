const serverless = require("serverless-http");
const express = require("express");
const app = express();

const routes = require("./src/modules/express");

const removePoweredBy = (req, res, next) => {
  const send = res.send;
  res.send = (data) => {
    res.removeHeader("X-Powered-By");
    return send.call(res, data);
  };

  next();
};

app.use("/", removePoweredBy, routes);

module.exports.handler = serverless(app);
