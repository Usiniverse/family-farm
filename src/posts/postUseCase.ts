import {PostRepository} from "./postRepository";
import {Post} from "./posts";
import {CreatePostDTO} from "./dtos/createPostDTO";
import {GetPostDTO} from "./dtos/getPostDTO";
import {GetPostsDTO} from "./dtos/getPostsDTO";
import {UpdatePostDTO} from "./dtos/updatePostDTO";
import {DeletePostDTO} from "./dtos/deletePostDTO";

export class PostUseCase {
    private postsRepository: PostRepository;

    constructor(postsRepository: PostRepository) {
        this.postsRepository = postsRepository;
    }

    async createPost(dto: CreatePostDTO): Promise<Post> {
        const { title, posting_password, content } = dto;

        if (!title) {
                throw new Error("제목을 입력해주세요");
        }

        // 최대 8자리의 숫자만 허용하는 정규식
        const passwordRegex = /^\d{1,8}$/;

        // 비밀번호 검증
        const isValidPassword = passwordRegex.test(posting_password);

        if (isValidPassword) {
            console.log("비밀번호가 유효합니다.");
        } else {
            console.log("비밀번호가 유효하지 않습니다.");
        }

        // `${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}`
        const post = await this.postsRepository.createPost({
            title,
            posting_password,
            content,
        });

        return post;
    }

    async getPost(dto: GetPostDTO): Promise<Post> {
        return await this.postsRepository.getPost(dto.id);
    }

    async getPosts(): Promise<Post[]> {
        return await this.postsRepository.getPosts();
    }

    async updatePost(dto: UpdatePostDTO): Promise<Post> {
        return await this.postsRepository.updatePost(dto.id, {
            ...dto
        });
    }

    async deletePost(dto: DeletePostDTO): Promise<Post> {
        return await this.postsRepository.delete(dto.id);
    }
}