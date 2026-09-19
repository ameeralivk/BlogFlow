import { Request, Response, NextFunction } from "express";

export interface IPostController {
  createPost(req: Request, res: Response, next: NextFunction): Promise<Response>;
  updatePost(req: Request, res: Response, next: NextFunction): Promise<Response>;
  deletePost(req: Request, res: Response, next: NextFunction): Promise<Response>;
  getPostById(req: Request, res: Response, next: NextFunction): Promise<Response>;
  getAllPosts(req: Request, res: Response, next: NextFunction): Promise<Response>;
  getPostsByAuthor(req: Request, res: Response, next: NextFunction): Promise<Response>;
}
