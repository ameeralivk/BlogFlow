import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import { TYPES } from "../../../DI/types";
import { IPostService } from "../../../service/postService/interface/IPostService";
import { IPostController } from "../interface/IPostController";
import HttpStatus from "../../../constants/httpStatus";
import { AppError } from "../../../utils/Error";

@injectable()
export class PostController implements IPostController {
  constructor(
    @inject(TYPES.postService)
    private _postService: IPostService
  ) {}

  createPost = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { title, content, tags, author, category } = req.body;
      const image = req.file ? req.file.path : null;

      if (!image) {
        throw new AppError("Image is required", HttpStatus.BAD_REQUEST);
      }

      const postData = {
        title,
        content,
        image,
        author,
        category: category || "Technology",
        tags: tags ? (Array.isArray(tags) ? tags : JSON.parse(tags)) : [],
      };

      const post = await this._postService.createPost(postData);

      return res.status(HttpStatus.CREATED).json({
        success: true,
        message: "Post created successfully",
        post,
      });
    } catch (error) {
      next(error);
    }
  };

  updatePost = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const { title, content, tags, category } = req.body;
      const image = req.file ? req.file.path : undefined;

      const updateData: any = {};
      if (title) updateData.title = title;
      if (content) updateData.content = content;
      if (tags) updateData.tags = Array.isArray(tags) ? tags : JSON.parse(tags);
      if (category) updateData.category = category;
      if (image) updateData.image = image;

      const post = await this._postService.updatePost(id as string, updateData);

      if (!post) {
        throw new AppError("Post not found", HttpStatus.NOT_FOUND);
      }

      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Post updated successfully",
        post,
      });
    } catch (error) {
      next(error);
    }
  };

  deletePost = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const success = await this._postService.deletePost(id as string);

      if (!success) {
        throw new AppError("Post not found", HttpStatus.NOT_FOUND);
      }

      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Post deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  getPostById = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const post = await this._postService.getPostById(id as string);

      if (!post) {
        throw new AppError("Post not found", HttpStatus.NOT_FOUND);
      }

      return res.status(HttpStatus.OK).json({
        success: true,
        post,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllPosts = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const posts = await this._postService.getAllPosts();
      return res.status(HttpStatus.OK).json({
        success: true,
        posts,
      });
    } catch (error) {
      next(error);
    }
  };

  getPostsByAuthor = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { authorId } = req.params;
      const posts = await this._postService.getPostsByAuthor(authorId as string);
      return res.status(HttpStatus.OK).json({
        success: true,
        posts,
      });
    } catch (error) {
      next(error);
    }
  };
}
