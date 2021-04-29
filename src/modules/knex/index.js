const knex = require("knex");
const knexConfig = require("./config");
const ENV =
  process.env.NODE_ENV != "production"
    ? knexConfig.development
    : knexConfig.production;
const database = knex(ENV);
const { attachPaginate } = require("knex-paginate");
attachPaginate();

const createModel = async ({
  knex = {},
  tableName = "tablename",
  selectableProps = [],
  timeout = 2000,
}) => {
  const create = (props) => {
    delete props.id;

    const newItem = {
      ...props,
      creado: new Date(),
      editado: new Date(),
    };

    return knex
      .insert(newItem)
      .into(tableName)
      .timeout(timeout)
      .then(([id]) => id);
  };

  const findAll = () =>
    knex.select(selectableProps).from(tableName).timeout(timeout);

  const find = (filters) =>
    knex
      .select(selectableProps)
      .from(tableName)
      .where(filters)
      .timeout(timeout);

  const findOne = (filters) =>
    find(filters).then((results) => {
      if (!Array.isArray(results)) return results;
      return results[0];
    });

  const findById = (id) =>
    knex.select(selectableProps).where({ id }).timeout(timeout);

  const update = (id, props) => {
    delete props.id;

    const newItem = {
      ...props,
      editado: new Date(),
    };

    return knex.update(newItem).from(tableName).where({ id }).timeout(timeout);
  };

  const destroy = (id) =>
    knex.del().from(tableName).where({ id }).timeout(timeout);

  return {
    create,
    findAll,
    find,
    findOne,
    findById,
    update,
    destroy,
    tableName,
  };
};

module.exports = {
  database,
  createModel,
};
