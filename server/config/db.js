const mysqlModel = require("mysql-model");
const colors = require("colors");

const AppModel = mysqlModel.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "telshop"
});

console.log("MySQL Connected bro!".blue);

module.exports = AppModel;
