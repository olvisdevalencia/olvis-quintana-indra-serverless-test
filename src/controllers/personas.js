const { StatusCodes } = require("http-status-codes");
const extractFilters = require("../utils/extractFilters");
const { personasModel } = require("../models");

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

    let people = await personasModel.findAll(filters);

    let newData = [];
    let newDataArray = people;

    if (people.data != undefined) {
      newDataArray = people.data;
    }

    for await (const person of newDataArray) {
      newData.push(person);
    }

    people =
      people.data != undefined ? { ...people, ...{ data: newData } } : newData;

    return res.status(StatusCodes.OK).send({ personas: people });
  } catch (error) {
    console.log("Error on: getPeople method", error);
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const createPerson = async (req, res) => {
  try {
    const data =
      req.apiGateway.event.body != null
        ? JSON.parse(req.apiGateway.event.body)
        : null;

    if (!data) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        success: false,
        message: "la informacion de la persona es requerida",
      });
    }

    const { persona } = data;

    const createdPerson = await personasModel.insertOne(persona);

    req.params = {
      ...req.params,
      ...{ id: createdPerson },
    };

    const response = await getPersonById(req, res);

    return response;
  } catch (error) {
    console.log("Error on: createPerson method", error);
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const updatePerson = async (req, res) => {
  try {
    const data =
      req.apiGateway.event.body != null
        ? JSON.parse(req.apiGateway.event.body)
        : null;

    const { id, persona } = data;

    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        success: false,
        message: "el id de la persona es requerida",
      });
    }

    if (!persona) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        success: false,
        message: "la informacion de la persona es requerida",
      });
    }

    const personFound = await personasModel.findOne({
      "personas.id": id,
    });

    if (!personFound) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        success: false,
        message: "Persona no encontrada",
      });
    }

    await personasModel.updateOne(id, persona);

    req.params = {
      ...req.params,
      ...{ id: id },
    };

    const response = await getPersonById(req, res);

    return response;
  } catch (error) {
    console.log("Error on: updatePerson method", error);
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

const deletePerson = async (req, res) => {
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

    await personasModel.destroyOne(id);

    return res.status(StatusCodes.OK).send({
      success: true,
      message: `Persona ${id} , eliminada correctamente`,
    });
  } catch (error) {
    console.log("Error on: deletePerson method", error);
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

module.exports = {
  getPeople,
  createPerson,
  updatePerson,
  getPersonById,
  deletePerson,
};
