import { inject, injectable } from "inversify";
import { TYPES } from "../../../DI/types";
import { IPostRepository } from "../../../Repositories/postRepository/interface/IPostRepository";
import { IPostService } from "../interface/IPostService";
import { PostDocument } from "../../../models/Post";

@injectable()
export class PostService implements IPostService {
  constructor(
    @inject(TYPES.postRepo)
    private _postRepo: IPostRepository
  ) {}

  async createPost(data: any): Promise<PostDocument> {
    return await this._postRepo.create(data);
  }

  async updatePost(id: string, data: any): Promise<PostDocument | null> {
    return await this._postRepo.update(id, data);
  }

  async deletePost(id: string): Promise<boolean> {
    return await this._postRepo.delete(id);
  }

  async getPostById(id: string): Promise<PostDocument | null> {
    return await this._postRepo.findById(id);
  }

  async getAllPosts(): Promise<PostDocument[]> {
    return await this._postRepo.findAllWithAuthor();
  }

  async getPostsByAuthor(authorId: string): Promise<PostDocument[]> {
    return await this._postRepo.findByAuthor(authorId);
  }
}
