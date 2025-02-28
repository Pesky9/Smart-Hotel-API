const db = require("../config/db");

class User {
  static async findByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }

  static async create({ uname, email, password_hash, urole, phone_number }) {
    const [result] = await db.execute(
      "INSERT INTO users (uname, email, password_hash, urole, phone_number) VALUES (?, ?, ?, ?, ?)",
      [uname, email, password_hash, urole, phone_number]
    );

    const [newUser] = await db.execute("SELECT * FROM users WHERE id = ?", [
      result.insertId,
    ]);
    return newUser[0];
  }
}

module.exports = User;
