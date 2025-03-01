const db = require("../config/db");

class Dashboard {
  // ----- USERS -----
  static async findAllUsers() {
    const [rows] = await db.execute("SELECT * FROM users");
    return rows;
  }

  static async findUserById(id) {
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  }

  static async createUser({
    uname,
    email,
    phone_number,
    password_hash,
    urole,
    dob,
  }) {
    const [result] = await db.execute(
      "INSERT INTO users (uname, email,password_hash,phone_number, urole,dob) VALUES (?, ?, ?, ?, ?, ?)",
      [uname, email, password_hash, phone_number, urole, dob]
    );
    return result.insertId;
  }

  static async updateUser(id, { uname, email, password_hash, urole }) {
    const [result] = await db.execute(
      "UPDATE users SET uname = ?, email = ?, password_hash = ?, urole = ? WHERE id = ?",
      [uname, email, password_hash, urole, id]
    );
    return result.affectedRows > 0;
  }

  static async deleteUser(id) {
    const [result] = await db.execute("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }

  // Specialized queries based on urole
  static async findAllGuests() {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE urole = 'guest'"
    );
    return rows;
  }

  static async findAllStaffMembers() {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE urole = 'staff'"
    );
    return rows;
  }

  // ----- BOOKINGS -----
  static async findAllBookings() {
    const [rows] = await db.execute("SELECT * FROM bookings");
    return rows;
  }

  static async findBookingById(id) {
    const [rows] = await db.execute("SELECT * FROM bookings WHERE id = ?", [
      id,
    ]);
    return rows[0];
  }

  static async createBooking({
    guest_id,
    checkin_date,
    checkout_date,
    bstatus = "pending",
  }) {
    const [result] = await db.execute(
      "INSERT INTO bookings (guest_id, checkin_date, checkout_date, bstatus) VALUES (?, ?, ?, ?)",
      [guest_id, checkin_date, checkout_date, bstatus]
    );
    return result.insertId;
  }

  static async updateBooking(
    id,
    { guest_id, checkin_date, checkout_date, bstatus }
  ) {
    const [result] = await db.execute(
      "UPDATE bookings SET guest_id = ?, checkin_date = ?, checkout_date = ?, bstatus = ? WHERE id = ?",
      [guest_id, checkin_date, checkout_date, bstatus, id]
    );
    return result.affectedRows > 0;
  }

  static async deleteBooking(id) {
    const [result] = await db.execute("DELETE FROM bookings WHERE id = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  }

  // ----- ROOMS -----
  static async findAllRooms() {
    const [rows] = await db.execute("SELECT * FROM rooms");
    return rows;
  }

  static async findRoomById(id) {
    const [rows] = await db.execute("SELECT * FROM rooms WHERE id = ?", [id]);
    return rows[0];
  }

  static async createRoom({ rtype, price, rstatus = "available" }) {
    const [result] = await db.execute(
      "INSERT INTO rooms (rtype, price, rstatus) VALUES (?, ?, ?)",
      [rtype, price, rstatus]
    );
    return result.insertId;
  }

  static async updateRoom(id, { rtype, price, rstatus }) {
    const [result] = await db.execute(
      "UPDATE rooms SET rtype = ?, price = ?, rstatus = ? WHERE id = ?",
      [rtype, price, rstatus, id]
    );
    return result.affectedRows > 0;
  }

  static async deleteRoom(id) {
    const [result] = await db.execute("DELETE FROM rooms WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Dashboard;
