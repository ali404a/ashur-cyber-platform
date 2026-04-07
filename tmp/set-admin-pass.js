const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Manually load .env.local because it's a standalone node process
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const mongoUriMatch = envContent.match(/MONGODB_URI=(.*)/);
const MONGODB_URI = mongoUriMatch ? mongoUriMatch[1].trim() : null;

async function setPassword() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI not found in .env.local");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    
    const UserSchema = new mongoose.Schema({
      phoneNumber: String,
      password: String,
      role: String,
      status: String
    });

    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    // Hash the password 'ashur2026'
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("ashur2026", salt);

    // Update or Create the user 07748880081 as Super Admin
    const result = await User.findOneAndUpdate(
      { phoneNumber: "07748880081" },
      { 
        password: hashedPassword,
        role: "admin", 
        status: "approved" 
      },
      { upsert: true, new: true }
    );

    console.log("Admin password (hashed) set successfully for 07748880081");
    process.exit(0);
  } catch (err) {
    console.error("Error setting password:", err);
    process.exit(1);
  }
}

setPassword();
