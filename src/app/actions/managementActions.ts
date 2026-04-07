"use server";

import dbConnect from "@/lib/db";
import Subject from "@/models/Subject";
import Material from "@/models/Material";
import Post from "@/models/Post";
import { revalidatePath } from "next/cache";

/**
 * Creates a new subject module
 */
export async function createSubject(formData: {
  nameAr: string;
  nameEn: string;
  gradeLevel: string;
  description?: string;
  semester?: string;
  icon?: string;
}) {
  try {
    await dbConnect();
    const newSubject = await Subject.create(formData);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/manage");
    return { success: true, subject: JSON.parse(JSON.stringify(newSubject)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Adds a material (PDF/Video) to a subject
 */
export async function addMaterial(formData: {
  title: string;
  type: "PDF" | "VIDEO" | "LINK" | "EXAM";
  url: string;
  subjectId: string;
  description?: string;
}) {
  try {
    await dbConnect();
    const newMaterial = await Material.create({
      title: formData.title,
      type: formData.type,
      url: formData.url,
      subject: formData.subjectId,
      description: formData.description,
    });
    
    revalidatePath(`/dashboard/subjects/${formData.subjectId}`);
    revalidatePath("/dashboard/manage");
    return { success: true, material: JSON.parse(JSON.stringify(newMaterial)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Deletes a subject and its materials
 */
export async function deleteSubject(subjectId: string) {
  try {
    await dbConnect();
    await Material.deleteMany({ subject: subjectId });
    await Subject.findByIdAndDelete(subjectId);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/manage");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Deletes a specific material
 */
export async function deleteMaterial(materialId: string, subjectId: string) {
  try {
    await dbConnect();
    await Material.findByIdAndDelete(materialId);
    revalidatePath(`/dashboard/subjects/${subjectId}`);
    revalidatePath("/dashboard/manage");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Gets all subjects for administrative management
 */
export async function getAllSubjects() {
  try {
    await dbConnect();
    const subjects = await Subject.find({}).sort({ gradeLevel: 1 }).lean();
    return { success: true, subjects: JSON.parse(JSON.stringify(subjects)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Dynamic News Posting
 */
export async function createPost(postData: {
  title: string;
  content: string;
  author: string;
  position: string;
  type: "important" | "info" | "event";
}) {
  try {
    await dbConnect();
    const newPost = await Post.create({
      ...postData,
      dateDisplay: "الآن"
    });
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/manage");
    return { success: true, post: JSON.parse(JSON.stringify(newPost)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Gets latest news bulletins
 */
export async function getLatestPosts() {
  try {
    await dbConnect();
    const posts = await Post.find({}).sort({ createdAt: -1 }).limit(6).lean();
    return { success: true, posts: JSON.parse(JSON.stringify(posts)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Deletes a post
 */
export async function deletePost(postId: string) {
  try {
    await dbConnect();
    await Post.findByIdAndDelete(postId);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/manage");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
