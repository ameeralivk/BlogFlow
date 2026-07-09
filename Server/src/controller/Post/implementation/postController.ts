import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import { TYPES } from "../../../DI/types";
import * as IPostService from "../../../service/postService/interface/IPostService";
import { IPostController } from "../interface/IPostController";
import HttpStatus from "../../../constants/httpStatus";
import { AppError } from "../../../utils/Error";
import { toPostResponseDTO, toPostResponseDTOList } from "../../../utils/dto/mapper/post.mapper";
import { CreatePostRequestDTO, UpdatePostRequestDTO } from "../../../utils/dto/dto/post.dto";

@injectable()
export class PostController implements IPostController {
  constructor(
    @inject(TYPES.postService)
    private _postService: IPostService.IPostService
  ) { }

  createPost = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { title, content, tags, author, category, status } = req.body;
      const image = req.file ? req.file.path : undefined;
      const postStatus = status === "published" ? "published" : "draft";

      if (!title) {
        throw new AppError("Title is required", HttpStatus.BAD_REQUEST);
      }

      if (postStatus === "published" && !image) {
        throw new AppError("Image is required to publish a post", HttpStatus.BAD_REQUEST);
      }

      const postData: CreatePostRequestDTO = {
        title,
        content,
        image,
        author,
        category: category || "Technology",
        tags: tags ? (Array.isArray(tags) ? tags : JSON.parse(tags)) : [],
        status: postStatus,
      };

      const post = await this._postService.createPost(postData);

      return res.status(HttpStatus.CREATED).json({
        success: true,
        message: "Post created successfully",
        post: toPostResponseDTO(post),
      });
    } catch (error) {
      next(error);
    }
  };

  updatePost = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const { title, content, tags, category, status } = req.body;
      const image = req.file ? req.file.path : undefined;

      const updateData: UpdatePostRequestDTO = {};
      if (title) updateData.title = title;
      if (content) updateData.content = content;
      if (tags) updateData.tags = Array.isArray(tags) ? tags : JSON.parse(tags);
      if (category) updateData.category = category;
      if (image) updateData.image = image;
      if (status === "draft" || status === "published") updateData.status = status;

      if (updateData.status === "published") {
        const existingPost = await this._postService.getPostById(id as string);
        if (!image && !existingPost?.image) {
          throw new AppError("Image is required to publish a post", HttpStatus.BAD_REQUEST);
        }
      }

      const post = await this._postService.updatePost(id as string, updateData);

      if (!post) {
        throw new AppError("Post not found", HttpStatus.NOT_FOUND);
      }

      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Post updated successfully",
        post: toPostResponseDTO(post),
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
        post: toPostResponseDTO(post),
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
        posts: toPostResponseDTOList(posts),
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
        posts: toPostResponseDTOList(posts),
      });
    } catch (error) {
      next(error);
    }
  };
}
