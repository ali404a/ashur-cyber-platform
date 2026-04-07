فشل الدخول للمسار الإداري

const fs = require('fs');
const mongoose = require('mongoose');

async function upgrade() {
  try {
    // Manually read the .env.local file to get MONGODB_URI
    const envContent = fs.readFileSync('.env.local', 'utf8');
    const match = envContent.match(/MONGODB_URI=(.*)/);
    if (!match) throw new Error("Could not find MONGODB_URI in .env.local");
    const mongoUri = match[1].trim().replace(/['"]/g, '');

    await mongoose.connect(mongoUri);
    console.log("Secure Connection Established...");

    const phoneNumber = "07748880081";
    
    // Attempt to update the user to Admin
    const result = await mongoose.connection.db.collection('users').updateOne(
      { phoneNumber },
      { 
        $set: { 
          role: "admin", 
          status: "approved" 
        } 
      }
    );

    if (result.matchedCount > 0) {
      console.log(`[SUCCESS] Account ${phoneNumber} elevated to Global Administrator status.`);
    } else {
      console.log(`[WARNING] Account ${phoneNumber} not found in database. Please register first.`);
    }

    process.exit(0);
  } catch (error) {
    console.error("[ERROR]", error.message);
    process.exit(1);
  }
}

upgrade();
