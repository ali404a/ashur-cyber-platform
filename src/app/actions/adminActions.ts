"use server";

import dbConnect from "@/lib/db";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

async function verifyAuth(requiredRole: "admin" | "management" | "any" = "admin") {
  const cookieStore = await cookies();
  const phone = cookieStore.get("user_phone")?.value;
  if (!phone) return null;

  await dbConnect();
  const user = await User.findOne({ phoneNumber: phone }).lean() as any;
  if (!user) return null;

  if (requiredRole === "any") return user;
  if (requiredRole === "admin" && user.role !== "admin") return null;
  if (requiredRole === "management" && (user.role !== "admin" && user.role !== "management")) return null;

  return user;
}

/**
 * Gets users filtered by status (Pending, Approved, Rejected)
 */
export async function getUsersByStatus(status: "pending" | "approved" | "rejected" | "all") {
  try {
    const admin = await verifyAuth("management");
    if (!admin) return { success: false, error: "غير مصرح لك بالوصول لهذا المصدر" };

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
    const admin = await verifyAuth("admin");
    if (!admin) return { success: false, error: "غير مصرح لك بتغيير حالات المستخدمين" };

    await User.findByIdAndUpdate(userId, { status: newStatus });
    revalidatePath("/admins");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// REMOVED upgradeToAdmin for security. Direct DB intervention only now.

/**
 * Deletes a user profile
 */
export async function deleteUser(userId: string) {
  try {
    const admin = await verifyAuth("admin");
    if (!admin) return { success: false, error: "غير مصرح لك بحذف المستخدمين" };

    await User.findByIdAndDelete(userId);
    revalidatePath("/admins");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Creates a new staff member (Admin/Management)
 */
export async function createStaffAccount(formData: FormData) {
  try {
    const admin = await verifyAuth("admin");
    if (!admin) return { success: false, error: "غير مصرح لك بإضافة أعضاء كادر" };
    
    const academicTitle = formData.get("academicTitle") as string;
    const rawName = formData.get("fullName") as string;
    const fullName = `${academicTitle} ${rawName}`.trim();
    const phoneNumber = formData.get("phoneNumber") as string;
    const password = formData.get("password") as string;
    const position = formData.get("position") as string;
    const role = formData.get("role") as "admin" | "management";

    const existing = await User.findOne({ phoneNumber });
    if (existing) {
      return { success: false, error: "رقم الهاتف مسجل مسبقاً في النظام" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      phoneNumber,
      password: hashedPassword,
      position,
      role,
      status: "approved",
    });

    await newUser.save();
    revalidatePath("/admins");
    return { success: true, message: `تم تفعيل حساب (${fullName}) بنجاح 🛡️` };
  } catch (error: any) {
    console.error("Staff creation error:", error);
    return { success: false, error: "فشل إنشاء الحساب، حاول مرة أخرى" };
  }
}

/**
 * Updates a user's role and position
 */
export async function updateStaffInfo(userId: string, data: { role: string, position: string, fullName: string }) {
  try {
    const admin = await verifyAuth("admin");
    if (!admin) return { success: false, error: "غير مصرح لك بتعديل بيانات الكادر" };

    await User.findByIdAndUpdate(userId, { 
      role: data.role, 
      position: data.position,
      fullName: data.fullName
    });
    
    revalidatePath("/admins");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
