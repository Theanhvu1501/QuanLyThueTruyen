const sql = require("mssql/msnodesqlv8");

const config = {
  server: process.env.SERVER || 'localhost' ,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  driver: process.env.DRIVER,
};

const connect = new sql
  .ConnectionPool(config)
  .connect()
  .then((pool) => pool);

module.exports = {
  sql: sql,
  connect: connect,
};
