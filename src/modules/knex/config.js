const {
  database: { HOST, PASSWORD, USER, NAME, PORT },
} = require("../../config");

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: HOST,
      user: USER,
      password: PASSWORD,
      port: PORT,
      database: NAME,
    },
    pool: {
      max: 50,
      min: 5,
    },
  },
  production: {
    client: "mysql",
    connection: {
      host: HOST,
      user: USER,
      password: PASSWORD,
      port: PORT,
      database: NAME,
    },
    pool: {
      max: 50,
      min: 5,
    },
  },
};
