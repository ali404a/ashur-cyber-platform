const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

const MONGODB_URI = "mongodb+srv://alialmortda_db_user:dTBQ6Rel42maoZbu@cluster0.ef5jyrl.mongodb.net/ashur_db?retryWrites=true&w=majority";

async function createAdminAccount() {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    const db = client.db("ashur_db");
    const users = db.collection("users");

    // Check/update existing admin
    const existing = await users.findOne({ phoneNumber: "07748880081" });
    if (existing) {
      const hashedPassword = await bcrypt.hash("ashur2026", 10);
      await users.updateOne(
        { phoneNumber: "07748880081" },
        { $set: { role: "admin", status: "approved", password: hashedPassword, position: "مسؤول النظام" } }
      );
      console.log("✅ Existing admin account updated!");
    } else {
      const hashedPassword = await bcrypt.hash("ashur2026", 10);
      await users.insertOne({
        fullName: "أ.د. علي المرتضى",
        phoneNumber: "07748880081",
        password: hashedPassword,
        position: "مسؤول النظام",
        role: "admin",
        status: "approved",
        createdAt: new Date(),
      });
      console.log("✅ Admin account created!");
    }

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🛡️  ADMIN ACCOUNT");
    console.log("📱 Phone:    07748880081");
    console.log("🔑 Password: ashur2026");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

createAdminAccount();
