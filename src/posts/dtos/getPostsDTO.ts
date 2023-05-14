import {Post} from "../posts";

export interface GetPostsDTO {
    total?: number
    limit?: number
    offset?: number
    post: Post[]
}