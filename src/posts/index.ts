import {CreatePostRepository} from "./createPostsRepository";
import {applefarmDB} from "../../shared/lib/db";
import {CreatePostController} from "./createPostController";
import {CreatePostUseCase} from "./createPostUseCase";

const postRepository = new CreatePostRepository(applefarmDB);
const createPostUseCase = new CreatePostUseCase(postRepository);
const createPostController = new CreatePostController(createPostUseCase);

export { createPostController, createPostUseCase }