const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

const MONGODB_URI = "mongodb+srv://alialmortda_db_user:dTBQ6Rel42maoZbu@cluster0.ef5jyrl.mongodb.net/ashur_db?retryWrites=true&w=majority";

async function createTestStudent() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    
    const db = client.db("ashur_db");
    const users = db.collection("users");

    // Check if test student already exists
    const existing = await users.findOne({ phoneNumber: "07700000001" });
    if (existing) {
      console.log("⚠️  Test student already exists!");
      console.log("📱 Phone: 07700000001");
      console.log("🔑 Password: student123");
      return;
    }

    const hashedPassword = await bcrypt.hash("student123", 10);
    
    const testStudent = {
      fullName: "علي محمد أحمد",
      phoneNumber: "07700000001",
      password: hashedPassword,
      gradeLevel: "الأول",
      role: "student",
      status: "approved", // Pre-approved for testing
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await users.insertOne(testStudent);
    console.log("✅ Test student created successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📱 Phone:    07700000001");
    console.log("🔑 Password: student123");
    console.log("👤 Name:     علي محمد أحمد");
    console.log("📚 Grade:    الأول");
    console.log("✅ Status:   Approved");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.close();
  }
}

createTestStudent();
