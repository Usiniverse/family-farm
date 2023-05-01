import { Post } from "./posts";
import { Knex } from "knex";
import {AppleFarmDBClient} from "../../shared/lib/db";
import {CreatePostDTO} from "./dtos/createPostDTO";
import {UpdatePostDTO} from "./dtos/updatePostDTO";

export class CreatePostRepository implements ICreatePostsRepository {
    private client: AppleFarmDBClient;

    constructor(client: AppleFarmDBClient) {
        this.client = client;
    }

    get knex(): Knex {
        return this.client.knex;
    }

    createPost(dto: CreatePostDTO): Promise<Post> {
        const query = this.knex("posts").insert(dto, ["*"]);

        return query.then((rows) => {
            return rows[0];
        });
    }

    getPost(id: number): Promise<Post> {
        return this.knex("posts").where({ id }).first();
    }

    updatePost(id: string, dto: UpdatePostDTO): Promise<Post> {
        return this.knex("posts").where({ id }).update(dto, ["*"]);
    }

    delete(id: string): Promise<Post> {
        return this.knex("posts").where({ id }).delete();
    }
}

interface ICreatePostsRepository {
    createPost(dto: CreatePostDTO): Promise<Post>;
    getPost(id: number): Promise<Post>;
    updatePost(id: string, dto: UpdatePostDTO): Promise<Post>;
    delete(id: string): Promise<Post>;
}
