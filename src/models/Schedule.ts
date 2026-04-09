import mongoose, { Schema, model, models } from "mongoose";

const ScheduleItemSchema = new Schema({
  subject: { type: String, required: true },
  teacher: { type: String, required: true },
  time: { type: String, required: true },
  hall: { type: String, required: true },
  type: { type: String, enum: ["theory", "practical"], default: "theory" },
});

const ScheduleSchema = new Schema(
  {
    gradeLevel: {
      type: String,
      required: true, // "1", "2", "3", "4"
    },
    type: {
      type: String,
      enum: ["lecture", "exam"],
      default: "lecture",
    },
    // For weekly lectures
    weeklyData: {
      type: Map,
      of: [ScheduleItemSchema],
      required: false,
    },
    // For exams
    examData: [
      {
        subject: String,
        date: String,
        time: String,
        hall: String,
        notes: String,
      }
    ],
    updatedBy: { type: String },
  },
  { timestamps: true }
);

const Schedule = models.Schedule || model("Schedule", ScheduleSchema);

export default Schedule;
