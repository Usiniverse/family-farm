import {PostRepository} from "./postRepository";
import {PostDTO} from "./posts";
import {CreatePostDTO} from "./dtos/createPostDTO";
import {GetPostDTO} from "./dtos/getPostDTO";
import {GetPostsDTO} from "./dtos/getPostsDTO";
import {UpdatePostDTO} from "./dtos/updatePostDTO";
import {DeletePostDTO} from "./dtos/deletePostDTO";

export class PostService {
    private postsRepository: PostRepository;

    constructor(postsRepository: PostRepository) {
        this.postsRepository = postsRepository;
    }

    async createPost(dto: CreatePostDTO): Promise<PostDTO> {
        const { title, posting_password, content } = dto;

        if (!title) {
            throw new Error("제목을 입력해주세요");
        }

        // 최대 8자리의 숫자만 허용하는 정규식
        const passwordRegex = /^\d{1,8}$/;

        // 비밀번호 검증
        const isValidPassword = passwordRegex.test(posting_password);

        if (isValidPassword) {
            // 비밀번호가 유효해야 함. 운영자만 글 쓰기 기능 추가해야함
            console.log("비밀번호가 유효합니다.");
        } else {
            // 비밀번호가 숫자가 아닐 경우 에러 처리
            console.log("비밀번호가 유효하지 않습니다.");
        }

        const post = await this.postsRepository.createPost({
            title,
            posting_password,
            content,
            images : {
                img_url: ''
            },
        });

        return post;
    }

    async getPost(dto: GetPostDTO): Promise<PostDTO> {
        return await this.postsRepository.getPost(dto.id);
    }

    async getPosts(): Promise<PostDTO[]> {
        return await this.postsRepository.getPosts();
    }

    async updatePost(dto: UpdatePostDTO): Promise<PostDTO> {
        return await this.postsRepository.updatePost(dto.id, {
            ...dto
        });
    }

    async deletePost(dto: DeletePostDTO): Promise<PostDTO> {
        return await this.postsRepository.deletePost(dto.id);
    }
}