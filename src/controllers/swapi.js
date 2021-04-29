const axios = require("axios");
const { StatusCodes } = require("http-status-codes");
const extractFilters = require("../utils/extractFilters");
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

    search = filters.buscar || "";
    currentPage = filters.paginaActual || 1;

    let { data } = await axios
      .get(`${endpoint}/people/?page=${currentPage}&search=${search}`)
      .then(async (data) => {
        let personas = [];
        for (const person of data.data.results) {
          const turned = await newPersonObject(person);
          personas.push(turned);
        }
        data.data.results = personas;
        return data;
      })
      .catch((err) => {
        console.log(err);
      });

    return res.status(StatusCodes.OK).send({ personas: data });
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

    let { data } = await axios.get(`${endpoint}/people/${id}`).catch((err) => {
      console.log(err);
    });

    if (!data) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        success: false,
        message: "Persona no encontrada",
      });
    }

    const turned = await newPersonObject(data);

    return res.status(StatusCodes.OK).send({ persona: turned });
  } catch (error) {
    console.log("Error on: getPersonById method", error);
    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

const renameKey = async (obj, oldKey, newKey) => {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
};

const newPersonObject = async (object) => {
  let person = object;
  let personObject = Object.keys(object);
  personObject.map((fieldName, index, value) => {
    if (fieldName == "name") {
      renameKey(person, fieldName, "nombre");
    }
    if (fieldName == "height") {
      renameKey(person, fieldName, "altura");
    }
    if (fieldName == "mass") {
      renameKey(person, fieldName, "peso");
    }
    if (fieldName == "hair_color") {
      renameKey(person, fieldName, "color_pelo");
    }
    if (fieldName == "skin_color") {
      renameKey(person, fieldName, "color_piel");
    }
    if (fieldName == "eye_color") {
      renameKey(person, fieldName, "color_ojos");
    }
    if (fieldName == "birth_year") {
      renameKey(person, fieldName, "anio_nacimiento");
    }
    if (fieldName == "gender") {
      renameKey(person, fieldName, "genero");
    }
    if (fieldName == "homeworld") {
      renameKey(person, fieldName, "mundo_natal");
    }
    if (fieldName == "films") {
      renameKey(person, fieldName, "peliculas");
    }
    if (fieldName == "species") {
      renameKey(person, fieldName, "especies");
    }
    if (fieldName == "vehicles") {
      renameKey(person, fieldName, "vehiculos");
    }
    if (fieldName == "starships") {
      renameKey(person, fieldName, "naves_estelares");
    }
    if (fieldName == "created") {
      renameKey(person, fieldName, "creado");
    }
    if (fieldName == "edited") {
      renameKey(person, fieldName, "editado");
    }
  });

  return person;
};

module.exports = {
  getPeople,
  getPersonById,
};
