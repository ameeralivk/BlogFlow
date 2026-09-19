import { PostDocument } from "../../../models/Post";
import { CreatePostRequestDTO, UpdatePostRequestDTO } from "../../../utils/dto/dto/post.dto";

export interface IPostService {
  createPost(data: CreatePostRequestDTO): Promise<PostDocument>;
  updatePost(id: string, data: UpdatePostRequestDTO): Promise<PostDocument | null>;
  deletePost(id: string): Promise<boolean>;
  getPostById(id: string): Promise<PostDocument | null>;
  getAllPosts(): Promise<PostDocument[]>;
  getPostsByAuthor(authorId: string): Promise<PostDocument[]>;
}
