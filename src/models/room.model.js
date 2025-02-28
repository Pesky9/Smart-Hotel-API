const db = require("../config/db");

class Room {
  static async findById(id) {
    const [rows] = await db.execute("SELECT * FROM rooms WHERE id = ?", [id]);
    return rows[0];
  }

  static async findAll() {
    const [rows] = await db.execute(
      "SELECT id, rtype, price, rstatus FROM rooms"
    );
    return rows;
  }

  static async findByStatus(status) {
    const [rows] = await db.execute(
      "SELECT id, rtype, price, rstatus FROM rooms WHERE rstatus = ?",
      [status]
    );
    return rows;
  }

  static async create({ rtype, price, rstatus = "available" }) {
    const [result] = await db.execute(
      "INSERT INTO rooms (rtype, price, rstatus) VALUES (?, ?, ?)",
      [rtype, price, rstatus]
    );

    const [newRoom] = await db.execute("SELECT * FROM rooms WHERE id = ?", [
      result.insertId,
    ]);
    return newRoom[0];
  }

  static async update(id, { rtype, price, rstatus }) {
    const [result] = await db.execute(
      "UPDATE rooms SET rtype = ?, price = ?, rstatus = ? WHERE id = ?",
      [rtype, price, rstatus, id]
    );

    const [updatedRoom] = await db.execute("SELECT * FROM rooms WHERE id = ?", [
      id,
    ]);
    return updatedRoom[0];
  }

  static async delete(id) {
    const [result] = await db.execute("DELETE FROM rooms WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Room;
