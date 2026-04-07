"use server";

import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function registerStudent(formData: FormData) {
  try {
    await connectDB();

    const fullName = formData.get("fullName") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const password = formData.get("password") as string;
    const gradeLevel = formData.get("gradeLevel") as string;

    // Check if user already exists
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return { success: false, message: "هذا الرقم مسجل مسبقاً" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      fullName,
      phoneNumber,
      password: hashedPassword,
      gradeLevel,
      status: "pending", // Always pending by default
    });

    await newUser.save();

    return { success: true, message: "تم إرسال طلبك بنجاح! بانتظار موافقة الإدارة." };
  } catch (error: any) {
    console.error("Registration error:", error);
    return { success: false, message: "فشل إرسال الطلب، حاول مرة أخرى" };
  }
}
