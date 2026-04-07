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

export async function loginStudent(formData: FormData) {
  try {
    await connectDB();

    const phoneNumber = formData.get("phone") as string;
    const password = formData.get("password") as string;

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return { success: false, message: "رقم الهاتف أو كلمة المرور غير صحيحة" };
    }

    if (user.status !== "approved") {
      return { success: false, message: "حسابك بانتظار موافقة الإدارة. يرجى المحاولة لاحقاً." };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: "رقم الهاتف أو كلمة المرور غير صحيحة" };
    }

    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    cookieStore.set("user_phone", user.phoneNumber, { 
      httpOnly: true, 
      secure: true,
      maxAge: 30 * 24 * 60 * 60, // 30 Days persistence
      path: "/",
    });
    cookieStore.set("user_role", user.role, { 
      httpOnly: true, 
      secure: true,
      maxAge: 30 * 24 * 60 * 60, // 30 Days persistence
      path: "/",
    });

    return { success: true, message: "تم تسجيل الدخول بنجاح!" };
  } catch (error: any) {
    console.error("Login error:", error);
    return { success: false, message: "حدث خطأ أثناء تسجيل الدخول" };
  }
}

/**
 * Specialized login for Staff (Admin/Management)
 */
export async function loginStaff(formData: FormData) {
  try {
    await connectDB();

    const phoneNumber = formData.get("phone") as string;
    const password = formData.get("password") as string;

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return { success: false, message: "بيانات الدخول غير صحيحة" };
    }

    // Critical Check: Only STAFF allowed
    if (user.role !== "admin" && user.role !== "management") {
      return { success: false, message: "عذراً، هذا المسار مخصص للمخولين فقط." };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: "بيانات الدخول غير صحيحة" };
    }

    // Set official staff cookies with long-lived persistence
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    cookieStore.set("user_phone", user.phoneNumber, { 
      httpOnly: true, 
      secure: true,
      maxAge: 30 * 24 * 60 * 60, // 30 Days persistence
      path: "/",
    });
    cookieStore.set("user_role", user.role, { 
      httpOnly: true, 
      secure: true,
      maxAge: 30 * 24 * 60 * 60, // 30 Days persistence
      path: "/",
    });

    return { 
      success: true, 
      message: "تم التحقق.. جاري الدخول لمركز القيادة 🛡️",
      role: user.role 
    };
  } catch (error: any) {
    console.error("Staff login error:", error);
    return { success: false, message: "فشل الدخول للمسار الإداري" };
  }
}

/**
 * Universal Logout Protocol
 */
export async function logout() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  cookieStore.delete("user_phone");
  cookieStore.delete("user_role");
  return { success: true };
}
