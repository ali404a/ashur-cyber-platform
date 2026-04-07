"use server";

import dbConnect from "@/lib/db";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

/**
 * Gets users filtered by status (Pending, Approved, Rejected)
 */
export async function getUsersByStatus(status: "pending" | "approved" | "rejected" | "all") {
  try {
    await dbConnect();
    const query = status === "all" ? {} : { status };
    const users = await User.find(query).sort({ createdAt: -1 }).lean();
    return { success: true, users: JSON.parse(JSON.stringify(users)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Updates a user's status (Approval/Rejection)
 */
export async function updateUserStatus(userId: string, newStatus: "approved" | "rejected" | "pending") {
  try {
    await dbConnect();
    await User.findByIdAndUpdate(userId, { status: newStatus });
    revalidatePath("/dashboard/admin");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Administrative upgrade for the first admin (Safety logic)
 */
export async function upgradeToAdmin(phoneNumber: string) {
  try {
    await dbConnect();
    
    // Hash the password 'ashur2026' for initial access
    const hashedPassword = await bcrypt.hash("ashur2026", 10);
    
    await User.findOneAndUpdate(
      { phoneNumber }, 
      { 
        password: hashedPassword,
        role: "admin", 
        status: "approved" 
      },
      { upsert: true }
    );
    
    revalidatePath("/dashboard");
    return { success: true, message: "تمت ترقية الحساب وتعيين رمز الدخول بنجاح 🛡️" };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Deletes a user profile
 */
export async function deleteUser(userId: string) {
  try {
    await dbConnect();
    await User.findByIdAndDelete(userId);
    revalidatePath("/dashboard/admin");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
