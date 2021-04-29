const instance = require("../modules/knex");

const selectableProps = [
  "personas.id",
  "personas.nombre",
  "personas.altura",
  "personas.peso",
  "personas.color_cabello",
  "personas.color_piel",
  "personas.color_ojos",
  "personas.anio_nacimiento",
  "personas.genero",
  "personas.creado",
  "personas.editado",
];

const tableName = "personas";
const timeout = 2000;

const personasModel = {
  ...instance.createModel({
    knex: instance.database,
    tableName,
    selectableProps,
  }),
  findOne: (filters) => {
    let query = instance.database
      .select(selectableProps)
      .from(tableName)
      .where(filters)
      .timeout(timeout)
      .then((results) => {
        if (!Array.isArray(results)) return results;
        return results[0];
      });

    return query;
  },
  findAll: ({ ...filters }) => {
    const search = filters["buscar"] || null;
    const perPage = filters["porPagina"] || null;
    const currentPage = filters["paginaActual"] || null;
    const gender = filters["genero"] || null;

    let query = instance.database
      .select(selectableProps)
      .from(tableName)
      .where((builder) => {
        if (search) {
          builder.orWhere("personas.nombre", "like", `%${search}%`);
        }
      })
      .where((builder) => {
        if (gender) {
          builder.where("personas.genero", gender);
        }
      })
      .timeout(timeout);

    if (perPage && currentPage) {
      query = query.paginate({
        perPage: perPage,
        currentPage: currentPage,
      });
    }

    return query;
  },
  insertOne: async (props) => {
    const newItem = {
      ...props,
    };
    let query = instance.database
      .insert(newItem)
      .into(tableName)
      .timeout(timeout)
      .then(([id]) => id);
    return query;
  },
  destroyOne: (id) => {
    let query = instance.database
      .del()
      .from(tableName)
      .where({ id: id })
      .timeout(timeout);

    return query;
  },
  updateOne: (id, props) => {
    const updateItem = {
      ...props,
      editado: new Date(),
    };
    let query = instance.database
      .update(updateItem)
      .from(tableName)
      .where({ id })
      .timeout(timeout);

    return query;
  },
};

module.exports = {
  ...personasModel,
};
