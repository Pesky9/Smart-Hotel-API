const mysql = require("mysql2");

const pool = mysql.createPool(process.env.DATABASE_URL, {
  ssl: {
    rejectUnauthorized: true,
  },
});

module.exports = pool.promise();
