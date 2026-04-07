"use server";

import dbConnect from "@/lib/db";
import Subject from "@/models/Subject";
import Material from "@/models/Material";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

export async function getStudentSubjects(phoneNumber: string) {
  try {
    await dbConnect();
    const user = await User.findOne({ phoneNumber });
    if (!user) return { success: false, error: "المستخدم غير موجود" };

    const subjects = await Subject.find({ gradeLevel: user.gradeLevel }).lean();
    return { success: true, subjects: JSON.parse(JSON.stringify(subjects)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getSubjectMaterials(subjectId: string) {
  try {
    await dbConnect();
    const materials = await Material.find({ subject: subjectId }).sort({ createdAt: -1 }).lean();
    return { success: true, materials: JSON.parse(JSON.stringify(materials)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Seeding function for testing/demo
export async function seedInitialSubjects() {
  try {
    await dbConnect();
    const count = await Subject.countDocuments();
    if (count > 0) return { success: true, message: "Data already exists" };

    const initialSubjects = [
      { nameAr: "تشفيـر البيـانات", nameEn: "Crypto_Systems", icon: "Lock", gradeLevel: "المرحلة الرابعة" },
      { nameAr: "أمن الشبكات", nameEn: "Network_Hardening", icon: "Server", gradeLevel: "المرحلة الأولى" },
      { nameAr: "هندسة العكسية", nameEn: "Reverse_Engineering", icon: "Cpu", gradeLevel: "المرحلة الرابعة" },
      { nameAr: "التحقيق الرقمي", nameEn: "Digital_Forensics", icon: "Search", gradeLevel: "المرحلة الأولى" },
      { nameAr: "برمجة آمنة", nameEn: "Secure_Coding", icon: "Code", gradeLevel: "المرحلة الثانية" },
    ];

    await Subject.insertMany(initialSubjects);
    revalidatePath("/dashboard");
    return { success: true, message: "Seeded successfully" };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
