const config = {
  server: {
    SWAGGER:
      process.env.NODE_ENV === "production"
        ? "wyk683izfb.execute-api.us-east-1.amazonaws.com/dev"
        : `localhost:${process.env.PORT || 3000}`,
    SWAGGER_FULL:
      process.env.NODE_ENV === "production"
        ? "https://wyk683izfb.execute-api.us-east-1.amazonaws.com/dev"
        : `http://localhost:${process.env.PORT || 3000}`,
    SWAGGER_SCHEME:
      process.env.NODE_ENV === "production"
        ? ["https", "http"]
        : ["http", "https"],
  },
  database: {
    PORT: 3306,
    NAME: "indra_test_db",
    HOST: "databasetestindra.cr4isminsti6.us-east-1.rds.amazonaws.com",
    USER: "indra_test_user",
    PASSWORD: "b95c6fb43c6d350758aefa",
  },
};

module.exports = config;
