import mongoose, { Schema, Document } from "mongoose";
import { IPost } from "../Types/IPost";

export interface PostDocument extends IPost, Document {}

const postSchema = new Schema<PostDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
      default: "Technology",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model<PostDocument>("Post", postSchema);
