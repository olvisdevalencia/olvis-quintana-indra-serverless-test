const axios = require("axios");
const { StatusCodes } = require("http-status-codes");
const extractFilters = require("../utils/extractFilters");
const { personasModel } = require("../models");
const endpoint = "https://swapi.dev/api";

const getPeople = async (req, res) => {
  try {
    const allowedFilters = [
      {
        name: "buscar",
        key: "buscar",
        convert: (searchField) => {
          const searchInteger = parseInt(searchField);
          if (isNaN(searchInteger)) return searchField;
          return searchInteger;
        },
      },
      {
        name: "genero",
        key: "genero",
        convert: (searchField) => {
          const searchInteger = parseInt(searchField);
          if (isNaN(searchInteger)) return searchField;
          return searchInteger;
        },
      },
      {
        name: "porPagina",
        key: "porPagina",
        convert: (searchField) => {
          const searchInteger = parseInt(searchField);
          if (isNaN(searchInteger)) return searchField;
          return searchInteger;
        },
      },
      {
        name: "paginaActual",
        key: "paginaActual",
        convert: (searchField) => {
          const searchInteger = parseInt(searchField);
          if (isNaN(searchInteger)) return searchField;
          return searchInteger;
        },
      },
    ];

    const filters = extractFilters(req.query, allowedFilters);

    let { data } = await axios.get(endpoint + "/people").then((data) => {
      console.log("llego o no llego ?");
      data.data.results.filter((data) => {
        return {
          nombre: data.name,
        };
      });

      return data;
    });

    let people = data;

    return res.status(StatusCodes.OK).send({ people });
  } catch (error) {
    console.log("Error on: getPeople method", error);
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const getPersonById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        success: false,
        message: "el id de la persona es requerida",
      });
    }

    let personFound = await personasModel.findOne({
      "personas.id": id,
    });

    if (!personFound) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        success: false,
        message: "Persona no encontrada",
      });
    }

    return res.status(StatusCodes.OK).send({ persona: personFound });
  } catch (error) {
    console.log("Error on: getPersonById method", error);
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

module.exports = {
  getPeople,
  getPersonById,
};
