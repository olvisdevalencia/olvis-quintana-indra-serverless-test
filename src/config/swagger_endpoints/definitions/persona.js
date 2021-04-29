const personaDef = {
  type: "object",
  properties: {
    persona: {
      type: "object",
      required: true,
      properties: {
        nombre: {
          type: "string",
          example: "Olvis Skywalker",
        },
        altura: {
          type: "integer",
          example: "168",
        },
        peso: {
          type: "integer",
          example: "60",
        },
        color_cabello: {
          type: "string",
          example: "negro",
        },
        color_piel: {
          type: "string",
          example: "moreno",
        },
        color_ojos: {
          type: "string",
          example: "marrones",
        },
        anio_nacimiento: {
          type: "integer",
          example: "1990",
        },
        genero: {
          type: "integer",
          example: "0",
        },
      },
    },
  },
};

module.exports = {
  ...personaDef,
};
