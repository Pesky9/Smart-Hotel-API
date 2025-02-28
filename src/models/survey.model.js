const db = require("../config/db");

const createSurveyTable = async () => {
  const query = `CREATE TABLE IF NOT EXISTS survey (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        ans JSON NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
  await db.execute(query);
};

module.exports = { createSurveyTable };
