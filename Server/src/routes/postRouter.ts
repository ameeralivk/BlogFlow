import express from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import container from "../DI/container";
import { TYPES } from "../DI/types";
import { IPostController } from "../controller/Post/interface/IPostController";
import { upload } from "../config/cloudinary";
import { protect } from "../middleware/authMiddleware";

const Router = express.Router();
const postController = container.get<IPostController>(TYPES.postController);

Router.route("/")
  .post(upload.single("image"),protect, asyncHandler(postController.createPost))
  .get(asyncHandler(postController.getAllPosts));

Router.route("/:id")
  .get(protect,asyncHandler(postController.getPostById))
  .put(upload.single("image"),protect, asyncHandler(postController.updatePost))
  .delete(protect,asyncHandler(postController.deletePost));

Router.route("/author/:authorId")
  .get(protect,asyncHandler(postController.getPostsByAuthor));

export default Router;
