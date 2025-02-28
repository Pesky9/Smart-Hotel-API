const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "mysql-17ff731d-sudhi2k03-555a.l.aivencloud.com",
  user: "avnadmin",
  password: "AVNS_oMis-sE7wcWCvJAtAGM",
  database: "defaultdb",
  port: 10938,
});

module.exports = pool.promise();
