import { PostDocument } from "../../../models/Post";
import { IBaseRepository } from "../../IBaseRepository";

export interface IPostRepository extends IBaseRepository<PostDocument> {
  findByAuthor(authorId: string): Promise<PostDocument[]>;
  findAllWithAuthor(): Promise<PostDocument[]>;
}
