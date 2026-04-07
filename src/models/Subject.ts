import mongoose, { Schema, model, models } from "mongoose";

const SubjectSchema = new Schema(
  {
    nameAr: {
      type: String,
      required: [true, "يرجى إدخال اسم المادة بالعربية"],
    },
    nameEn: {
      type: String,
      required: [true, "Please enter subject name in English"],
    },
    icon: {
      type: String,
      default: "Shield", // Lucide icon name
    },
    gradeLevel: {
      type: String,
      required: [true, "يرجى تحديد المرحلة"],
      enum: ["المرحلة الأولى", "المرحلة الثانية", "المرحلة الثالثة", "المرحلة الرابعة"],
    },
    description: {
      type: String,
      default: "منهج أكاديمي متخصص في الأمن السيبراني.",
    },
    semester: {
      type: String,
      enum: ["الفصل الأول", "الفصل الثاني"],
      default: "الفصل الأول",
    },
  },
  { timestamps: true }
);

const Subject = models.Subject || model("Subject", SubjectSchema);

export default Subject;
