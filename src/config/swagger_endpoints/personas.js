const personasSwagger = {
  "/personas": {
    "x-swagger-router-controller": "main-controller",
    get: {
      operationId: "todasLasPersonas",
      description: "Obtener todas las personas",
      parameters: [
        {
          name: "buscar",
          in: "query",
          description: "e.g Luke Skywalker",
          type: "string",
        },
        {
          name: "genero",
          in: "query",
          description: "[0 Masculino, 1 Femenino]",
          type: "array",
          items: {
            type: "string",
            enum: ["0", "1"],
          },
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
    post: {
      operationId: "creacionDePersona",
      description:
        "Creación de persona, para el genero usar la siguiente información [0 masculino, 1 femenino]",
      parameters: [
        {
          name: "Información requerida",
          in: "body",
          required: true,
          type: "object",
          schema: {
            $ref: "#/definitions/Persona",
          },
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
    put: {
      operationId: "actualizarUsuario",
      description: "Actualización de persona",
      parameters: [
        {
          name: "Información requerida",
          in: "body",
          required: true,
          type: "object",
          schema: {
            $ref: "#/definitions/EditarPersona",
          },
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
  "/personas/{id}": {
    "x-swagger-router-controller": "main-controller",
    get: {
      operationId: "obtenerPersonaPorId",
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
    delete: {
      operationId: "eliminarPersona",
      description: "Eliminar persona por id",
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
