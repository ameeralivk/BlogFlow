import mongoose, { Schema} from "mongoose";
import { IUser } from "../Types/IUser";
export interface UserDocuments extends IUser, Document {}
const userSchema = new Schema<UserDocuments>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    profileImage: {
      type: String,
      default: ""
    },
  },
  {
    timestamps: true
  }
);

export const User = mongoose.model<UserDocuments>("User", userSchema);