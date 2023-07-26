// import * as jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import { User, UserRepository } from './user';

// export class AuthService {
//     private userRepository: UserRepository;

//     constructor(userRepository: UserRepository) {
//         this.userRepository = userRepository;
//     }

//     public async signUp(email: string, password: string): Promise<User> {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user: User = {
//             id: Date.now().toString(),
//             email,
//             password: hashedPassword,
//         };
//         return this.userRepository.createUser(user);
//     }

//     public async signIn(email: string, password: string): Promise<string> {
//         const user = this.userRepository.getUserByEmail(email);
//         if (!user) {
//             throw new Error('User not found');
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             throw new Error('Invalid password');
//         }

//         const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });
//         return token;
//     }

//     public verifyToken(token: string): User {
//         try {
//             const decoded = jwt.verify(token, 'secret_key') as { id: string };
//             const user = this.userRepository.getUserById(decoded.id);
//             if (!user) {
//                 throw new Error('User not found');
//             }
//             return user;
//         } catch (error) {
//             throw new Error('Invalid token');
//         }
//     }
// }
