"use server";

import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function registerStudent(formData: FormData) {
  try {
    await connectDB();
    const fullName = formData.get("fullName") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const password = formData.get("password") as string;
    const gradeLevel = formData.get("gradeLevel") as string;

    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return { success: false, message: "هذا الرقم مسجل مسبقاً" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, phoneNumber, password: hashedPassword, gradeLevel, status: "pending" });
    await newUser.save();
    return { success: true, message: "تم إرسال طلبك بنجاح! بانتظار موافقة الإدارة." };
  } catch (error: any) {
    console.error("Registration error:", error);
    return { success: false, message: "فشل إرسال الطلب، حاول مرة أخرى" };
  }
}

export async function loginStudent(formData: FormData) {
  try {
    await connectDB();
    const phoneNumber = formData.get("phone") as string;
    const password = formData.get("password") as string;

    const user = await User.findOne({ phoneNumber });
    if (!user) return { success: false, message: "رقم الهاتف أو كلمة المرور غير صحيحة" };
    if (user.status !== "approved") return { success: false, message: "حسابك بانتظار موافقة الإدارة." };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { success: false, message: "رقم الهاتف أو كلمة المرور غير صحيحة" };

    const cookieStore = await cookies();
    cookieStore.set("user_phone", user.phoneNumber, { httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60, path: "/" });
    cookieStore.set("user_role", user.role, { httpOnly: false, secure: true, maxAge: 30 * 24 * 60 * 60, path: "/" });
    cookieStore.set("user_name", user.fullName, { httpOnly: false, secure: true, maxAge: 30 * 24 * 60 * 60, path: "/" });

    return { success: true, message: "تم تسجيل الدخول بنجاح!" };
  } catch (error: any) {
    console.error("Login error:", error);
    return { success: false, message: "حدث خطأ أثناء تسجيل الدخول" };
  }
}

export async function loginStaff(formData: FormData) {
  try {
    await connectDB();

    const phoneNumber = formData.get("phone") as string;
    const password = formData.get("password") as string;

    if (!phoneNumber || !password) {
      return { success: false, message: "يرجى إدخال رقم الهاتف وكلمة المرور" };
    }

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return { success: false, message: "رقم الهاتف غير موجود في النظام" };
    }

    if (user.role !== "admin" && user.role !== "management") {
      return { success: false, message: "عذراً، هذا المسار مخصص للكادر الإداري فقط" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: "كلمة المرور غير صحيحة" };
    }

    const cookieStore = await cookies();
    cookieStore.set("user_phone", user.phoneNumber, { httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60, path: "/" });
    cookieStore.set("user_role", user.role, { httpOnly: false, secure: true, maxAge: 30 * 24 * 60 * 60, path: "/" });
    cookieStore.set("user_name", user.fullName, { httpOnly: false, secure: true, maxAge: 30 * 24 * 60 * 60, path: "/" });

    return { success: true, message: "تم التحقق بنجاح 🛡️", role: user.role };
  } catch (error: any) {
    console.error("Staff login error:", error);
    return { success: false, message: `خطأ في الخادم: ${error.message || "فشل الاتصال"}` };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("user_phone");
  cookieStore.delete("user_role");
  cookieStore.delete("user_name");
  return { success: true };
}
