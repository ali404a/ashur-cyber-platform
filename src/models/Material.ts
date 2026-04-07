import mongoose, { Schema, model, models } from "mongoose";

const MaterialSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "يرجى إدخال عنوان المحاضرة"],
    },
    type: {
      type: String,
      enum: ["PDF", "VIDEO", "LINK", "EXAM"],
      default: "PDF",
    },
    url: {
      type: String,
      required: [true, "يرجى توفير الرابط"],
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    description: {
      type: String,
    },
    isPublic: {
      type: Boolean,
      default: false, // For future general/public lectures
    },
  },
  { timestamps: true }
);

const Material = models.Material || model("Material", MaterialSchema);

export default Material;
