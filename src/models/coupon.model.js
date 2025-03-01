const db = require("../config/db");

module.exports = {
  storeCoupon: async (coupon) => {
    const query = "INSERT INTO coupon (code, discount) VALUES (?, ?)";
    await db.execute(query, [coupon.code, coupon.discount]);
  },

  deleteCoupon: async (code) => {
    const query = "DELETE FROM coupon WHERE code = ?";
    await db.execute(query, [code]);
  },
};
