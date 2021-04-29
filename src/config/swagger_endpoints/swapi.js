const personasSwagger = {
  "/swapi/personas": {
    "x-swagger-router-controller": "main-controller",
    get: {
      operationId: "swapiTodasLasPersonas",
      description: "Obtener todas las personas",
      parameters: [
        {
          name: "buscar",
          in: "query",
          description: "e.g Luke Skywalker",
          type: "string",
        },
        {
          name: "paginaActual",
          in: "query",
          description: "1",
          type: "integer",
        },
      ],
      responses: {
        200: {
          description: "Success",
          schema: {
            $ref: "#/definitions/Resource",
          },
        },
        403: {
          description: "Access Denied",
          schema: {
            $ref: "#/definitions/Error",
          },
        },
      },
    },
  },
  "/swapi/personas/{id}": {
    "x-swagger-router-controller": "main-controller",
    get: {
      operationId: "swapiObtenerPersonaPorId",
      description: "Obtener persona por id",
      parameters: [
        {
          name: "id",
          id: "persona id",
          in: "path",
          required: true,
          type: "integer",
        },
      ],
      responses: {
        200: {
          description: "Success",
          schema: {
            $ref: "#/definitions/Resource",
          },
        },
        403: {
          description: "Access Denied",
          schema: {
            $ref: "#/definitions/Error",
          },
        },
      },
    },
  },
};

module.exports = {
  ...personasSwagger,
};
