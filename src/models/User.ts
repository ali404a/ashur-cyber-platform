import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "يرجى إدخال الاسم الثلاثي"],
    },
    phoneNumber: {
      type: String,
      required: [true, "يرجى إدخال رقم الهاتف"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "يرجى إدخال كلمة المرور"],
    },
    gradeLevel: {
      type: String,
      required: false, // Optional for staff
    },
    position: {
      type: String,
      required: false, // For staff only
    },
    role: {
      type: String,
      enum: ["student", "management", "admin"],
      default: "student",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
