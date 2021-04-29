const {
  server: { SWAGGER, SWAGGER_FULL, SWAGGER_SCHEME },
} = require("./index");

const { personas } = require("./swagger_endpoints/index");

const {
  Persona,
  EditarPersona,
  Resource,
  Token,
} = require("./swagger_endpoints/definitions/index");

const swagger = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "INDRA SWAPI, DOCUMENTACIÓN API",
    description: "INDRA SWAPI rest api.",
    termsOfService: SWAGGER_FULL,
    contact: {
      name: "API Support",
      url: SWAGGER_FULL,
      email: "quintanaolvis@gmail.com",
    },
  },
  host: SWAGGER,
  basePath: "/api",
  schemes: SWAGGER_SCHEME,
  consumes: ["application/json"],
  produces: ["application/json"],
  paths: {
    ...personas,
  },
  definitions: {
    Persona,
    EditarPersona,
    Resource,
    Token,
    Error: {
      type: "object",
      properties: {
        message: {
          type: "string",
        },
      },
    },
  },
};

module.exports = swagger;
