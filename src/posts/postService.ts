import {PostRepository} from "./postRepository";
import {PostDTO} from "./posts";
import {CreatePostDTO} from "./dtos/createPostDTO";
import {GetPostDTO} from "./dtos/getPostDTO";
import {GetPostsDTO} from "./dtos/getPostsDTO";
import {UpdatePostDTO} from "./dtos/updatePostDTO";
import {DeletePostDTO} from "./dtos/deletePostDTO";
import {UserRepository} from "../users/userRepository"

export class PostService {
    private postsRepository: PostRepository;
    // private userRepository: UserRepository

    constructor(postsRepository: PostRepository,
        //  userRepository: UserRepository
         ) {
        this.postsRepository = postsRepository;
        // this.userRepository = userRepository;
    }

    public async createPost(dto: CreatePostDTO): Promise<PostDTO[]> {
        const { title, posting_password, content, sns_id, images } = dto;
        console.log('dto::: ', dto);
        
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
            sns_id
        });
        console.log('DB생성 후 서비스 반환값::: ', post);
        

        return post;
    }

    public async getPost(dto: GetPostDTO): Promise<PostDTO[]> {
        return await this.postsRepository.getPost(dto.id);
    }

    public async getPosts(): Promise<PostDTO[]> {
        return await this.postsRepository.getPosts();
    }

    public async getPostsByUserId(id: number): Promise<PostDTO[]> {
        return await this.postsRepository.getPostsByUserId(id)
    }

    public async updatePost(dto: UpdatePostDTO): Promise<PostDTO> {
        return await this.postsRepository.updatePost(dto.id, {
            ...dto
        });
    }

    public async deletePost(dto: DeletePostDTO): Promise<PostDTO> {
        return await this.postsRepository.deletePost(dto.id);
    }

    public async test(id: string): Promise<any> {
        const test = await this.postsRepository.getPostsBySnsId(id)
        console.log('service 단계 :::', test);

        return test
    }
}