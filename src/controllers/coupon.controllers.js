const db = require("../config/db");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASS,
  },
});

function generateRandomCoupon() {
  return "CPN-" + Math.random().toString(36).substring(2, 10).toUpperCase();
}

const sendBirthdayCoupons = async () => {
  const query = `
    SELECT * FROM users 
    WHERE DATE_FORMAT(birthday, '%m-%d') = DATE_FORMAT(CURDATE(), '%m-%d')
      AND urole = 'guest'
  `;
  const [users] = await db.execute(query);

  for (const user of users) {
    const couponCode = generateRandomCoupon();

    // (Optional) You might want to store the coupon code in a coupons table here.
    // e.g., await db.execute('INSERT INTO coupons (user_id, coupon_code) VALUES (?, ?)', [user.id, couponCode]);

    // Prepare a wholesome birthday email
    const mailOptions = {
      from: '"GoFindStay" <parikshithny.mca24@bmsce.ac.in>',
      to: user.email,
      subject: "Happy Birthday from GoFindStay!",
      text: `Dear ${user.uname},

Happy Birthday! We at GoFindStay hope your day is filled with joy and laughter. As a token of our appreciation for being a valued guest, please enjoy this exclusive coupon code: ${couponCode}.

Redeem this coupon for a special discount on your next booking with us. We wish you a year full of wonderful memories and unforgettable experiences.

Warmest wishes,
GoFindStay Team`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Sent coupon ${couponCode} to ${user.email}`);
  }
};

module.exports = { sendBirthdayCoupons };
