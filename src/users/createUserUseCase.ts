import {UserRepository} from "./createUserRepository";
import {CreateUserDTO} from "./dtos/createUserDTO";
import bcrypt from "bcrypt";

export class CreateUserUseCase {
    private userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }
    async execute(dto: CreateUserDTO) {
        const { email, password } = dto;

        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(email)) {
            throw new Error('이메일 형식이 올바르지 않습니다.');
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\W)(?=.*[a-z])(?=.*[0-9]).{8,12}$/;
        if (!passwordRegex.test(password)) {
            throw new Error('비밀번호가 규칙에 맞지 않습니다.');
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
       return await this.userRepository.createUser({
           ...dto,
           password: hashedPassword
       });
    }
}