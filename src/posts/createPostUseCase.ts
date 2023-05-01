import {CreatePostRepository} from "./createPostsRepository";
import {Post} from "./posts";
import {CreatePostDTO} from "./dtos/createPostDTO";

export class CreatePostUseCase {
    private postsRepository: CreatePostRepository;

    constructor(postsRepository: CreatePostRepository) {
        this.postsRepository = postsRepository;
    }

    async execute(dto: CreatePostDTO): Promise<Post> {
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

        const post = await this.postsRepository.createPost(dto);

        return post;
    }
}