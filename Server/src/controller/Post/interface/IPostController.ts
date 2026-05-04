import { Request, Response, NextFunction } from "express";

export interface IPostController {
  createPost(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  updatePost(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  deletePost(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getPostById(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getAllPosts(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  getPostsByAuthor(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
