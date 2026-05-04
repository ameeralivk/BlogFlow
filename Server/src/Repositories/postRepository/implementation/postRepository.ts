import { injectable } from "inversify";
import { BaseRepository } from "../../BaseRepository";
import { Post, PostDocument } from "../../../models/Post";
import { IPostRepository } from "../interface/IPostRepository";

@injectable()
export class PostRepository extends BaseRepository<PostDocument> implements IPostRepository {
  constructor() {
    super(Post);
  }

  async findByAuthor(authorId: string): Promise<PostDocument[]> {
    return await this.model.find({ author: authorId }).sort({ createdAt: -1 }).populate("author", "fullName email profileImage");
  }

  async findAllWithAuthor(): Promise<PostDocument[]> {
    return await this.model.find().sort({ createdAt: -1 }).populate("author", "fullName email profileImage");
  }
  
  override async findById(id: string): Promise<PostDocument | null> {
      return await this.model.findById(id).populate("author", "fullName email profileImage");
  }
}
