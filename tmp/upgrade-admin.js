require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function upgrade() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error("MONGODB_URI is not defined");

    await mongoose.connect(mongoUri);
    console.log("Connected to Secure Base...");

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
      console.log(`[SUCCESS] Account ${phoneNumber} upgraded to Administrative Authority Level 01.`);
    } else {
      console.log(`[WARNING] Account ${phoneNumber} not found. Please register on the site first, then I will upgrade you.`);
    }

    process.exit(0);
  } catch (error) {
    console.error("[ERROR]", error);
    process.exit(1);
  }
}

upgrade();
