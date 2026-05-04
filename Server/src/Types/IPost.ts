import { Types } from "mongoose";

export interface IPost {
  title: string;
  content: string;
  image: string;
  author: Types.ObjectId | string;
  category: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
