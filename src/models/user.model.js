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

  static async findAll() {
    const [rows] = await db.execute(
      "SELECT id, uname, email, phone_number, urole, created_at FROM users"
    );
    return rows;
  }

  static async findByRole(role) {
    const [rows] = await db.execute(
      "SELECT id, uname, email, phone_number, urole, created_at FROM users WHERE urole = ?",
      [role]
    );
    return rows;
  }
  static async bookRoom({
    guest_id,
    checkin_date,
    checkout_date,
    price,
    room_type,
  }) {
    const [result] = await db.execute(
      `INSERT INTO bookings (guest_id, checkin_date, checkout_date, price, room_type) 
       VALUES (?, ?, ?, ?, ?)`,
      [guest_id, checkin_date, checkout_date, price, room_type]
    );

    const [newBooking] = await db.execute(
      "SELECT * FROM bookings WHERE id = ?",
      [result.insertId]
    );

    return newBooking[0];
  }
  static async getUsersWithBirthday(today) {
    const [rows] = await db.execute(
      "SELECT id, uname, email FROM users WHERE DATE_FORMAT(dob, '%m-%d') = ?",
      [today]
    );
    return rows;
  }
}

module.exports = User;
