import {PostRepository} from "./postRepository";
import {applefarmDB} from "../../shared/lib/db";
import {PostController} from "./postController";
import {PostUseCase} from "./postUseCase";

const postRepository = new PostRepository(applefarmDB);
const postUseCase = new PostUseCase(postRepository);
const postController = new PostController(postUseCase);

export { postController, postUseCase }