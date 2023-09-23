import { applefarmDB } from "../../shared/lib/db";
import { PostRepository } from "./postRepository";
import { PostController } from "./postController";
import { PostService } from "./postService";

const postRepository = new PostRepository(applefarmDB);
const postService = new PostService(postRepository);
const postController = new PostController(postService);

export { postController, postService }