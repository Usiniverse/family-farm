import { PostDTO } from "./posts";
import { Knex } from "knex";
import {AppleFarmDBClient} from "../../shared/lib/db";
import {CreatePostDTO} from "./dtos/createPostDTO";
import {UpdatePostDTO} from "./dtos/updatePostDTO";
import { client } from "../../shared/lib/db";
import { Connection, Query } from "pg";
import e from "express";

interface UserType {
    id: number
    sns_id: string,
    title:string,
    content: string,
    posting_password: string,
    images: { 
        img_url: string 
    },
    options: object,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date
}

export class PostRepository implements ICreatePostsRepository {
    private client: AppleFarmDBClient;

    constructor(client: AppleFarmDBClient) {
        this.client = client;
    }

    get knex(): Knex {
        return this.client.knex;
    }

    // 
    
    public async createPost(dto: CreatePostDTO): Promise<PostDTO[]> {
        const insertQuery = `INSERT INTO posts (sns_id, title, content, posting_password, images) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [dto.sns_id, dto.title, dto.content, dto.posting_password, dto.images];
    
        try {
            const insertResult = await client.query(insertQuery, values);
            console.log('게시글 DB생성 완료 :::', insertResult.rows);
            
            client.end();
    
            return insertResult.rows as PostDTO[];
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
    

    public async getPost(id: number): Promise<PostDTO[]> {
        const query = 'SELECT * FROM posts WHERE id = $1';
        const values = [id]
    
        try {
            const result = await client.query(query, values);
            return result.rows as PostDTO[];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public async getPostsBySnsId(id: string): Promise<PostDTO[]> {
        const query = 'SELECT * FROM posts WHERE sns_id = $1';
        const values = [id]
    
        try {
            const result = await client.query(query, values);
            return result.rows as PostDTO[];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    

    getPosts(): Promise<PostDTO[]> {
        return this.knex("posts").select();
    }

    public async getPostsByUserId(id: number): Promise<PostDTO[]> {
        const query = `SELECT * FROM posts WHERE user_id = $1`
        const values = [id]
    
        try {
            const result = await client.query(query, values);
            return result.rows as PostDTO[];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    updatePost(id: number, dto: UpdatePostDTO): Promise<PostDTO> {
        return this.knex("posts").where({ id }).update(dto, ["*"]);
    }

    deletePost(id: number): Promise<PostDTO> {
        return this.knex("posts").where({ id }).delete();
    }
}

interface ICreatePostsRepository {
    createPost(dto: CreatePostDTO): Promise<PostDTO[]>;
    getPost(id: number): Promise<PostDTO[]>;
    getPostsByUserId(id: number): Promise<PostDTO[]>
    getPostsBySnsId(id:string): Promise<PostDTO[]>
    updatePost(id: number, dto: UpdatePostDTO): Promise<PostDTO>;
    deletePost(id: number): Promise<PostDTO>
}
