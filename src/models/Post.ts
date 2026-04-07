import mongoose, { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "يرجى إدخال عنوان المنشور"],
    },
    content: {
      type: String,
      required: [true, "يرجى إدخال محتوى المنشور"],
    },
    author: {
      type: String,
      required: true,
      default: "الإدارة التعليمية",
    },
    position: {
      type: String,
      default: "أمن سيبراني",
    },
    type: {
      type: String,
      enum: ["important", "info", "event"],
      default: "info",
    },
    dateDisplay: {
      type: String,
      default: "الآن",
    }
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", PostSchema);

export default Post;
