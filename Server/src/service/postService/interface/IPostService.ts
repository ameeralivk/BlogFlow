import { PostDocument } from "../../../models/Post";

export interface IPostService {
  createPost(data: any): Promise<PostDocument>;
  updatePost(id: string, data: any): Promise<PostDocument | null>;
  deletePost(id: string): Promise<boolean>;
  getPostById(id: string): Promise<PostDocument | null>;
  getAllPosts(): Promise<PostDocument[]>;
  getPostsByAuthor(authorId: string): Promise<PostDocument[]>;
}
