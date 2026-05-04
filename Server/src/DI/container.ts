import { Container } from "inversify";
import {TYPES} from "./types"
import { UserAuthController} from "../controller/UserAuth/implementation/userController";
import { UserAuthService } from "../service/userAuthService/implementation/userAuthService";
import { UserAuthRepository } from "../Repositories/userAuthRepository/implementation/userAuthRepository";
import { PostRepository } from "../Repositories/postRepository/implementation/postRepository";
import { PostService } from "../service/postService/implementation/postService";
import { PostController } from "../controller/Post/implementation/postController";

const container = new Container();

container.bind(TYPES.userAuthController).to(UserAuthController)
container.bind(TYPES.userAuthService).to(UserAuthService)
container.bind(TYPES.userAuthRepo).to(UserAuthRepository)
container.bind(TYPES.postRepo).to(PostRepository)
container.bind(TYPES.postService).to(PostService)
container.bind(TYPES.postController).to(PostController)


export default container;
