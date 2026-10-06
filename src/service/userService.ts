import { AppDataSource } from "../config/database";
import { User } from "../model/user";

export class UserService {

    private userRepository = AppDataSource.getMongoRepository(User);

    async createUser(data: User) {
        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }

    async findOne(data: any) {
        return this.userRepository.findOne(data);
    }

    async update(data: Partial<User>) {
         const user = await this.userRepository.save(data)
    }
}