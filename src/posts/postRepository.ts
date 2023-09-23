import { PostDTO } from "./posts";
import { Knex } from "knex";
import {AppleFarmDBClient} from "../../shared/lib/db";
import {CreatePostDTO} from "./dtos/createPostDTO";
import {UpdatePostDTO} from "./dtos/updatePostDTO";

export class PostRepository implements ICreatePostsRepository {
    private client: AppleFarmDBClient;

    constructor(client: AppleFarmDBClient) {
        this.client = client;
    }

    get knex(): Knex {
        return this.client.knex;
    }

    createPost(dto: CreatePostDTO): Promise<PostDTO> {
        const query = this.knex("posts").insert(dto, ["*"]);

        return query.then((rows) => {
            return rows[0];
        });
    }

    getPost(id: number): Promise<PostDTO> {
        return this.knex("posts").where({ id }).first();
    }

    getPosts(): Promise<PostDTO[]> {
        return this.knex("posts").select();
    }

    updatePost(id: number, dto: UpdatePostDTO): Promise<PostDTO> {
        return this.knex("posts").where({ id }).update(dto, ["*"]);
    }

    deletePost(id: number): Promise<PostDTO> {
        return this.knex("posts").where({ id }).delete();
    }
}

interface ICreatePostsRepository {
    createPost(dto: CreatePostDTO): Promise<PostDTO>;
    getPost(id: number): Promise<PostDTO>;
    updatePost(id: number, dto: UpdatePostDTO): Promise<PostDTO>;
    deletePost(id: number): Promise<PostDTO>;
}
