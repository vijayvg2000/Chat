import { AppDataSource } from "../config/database";
import { Chat } from "../model/chat";

export class ChatService {

    private chatRepository = AppDataSource.getMongoRepository(Chat);

    async create(data: any) {
        return this.chatRepository.save(data);
    }

    async findOne(chatId: any) {
        return this.chatRepository.findOne(chatId);
    }

    async update(data: Partial<Chat>) {
         const chat = await this.chatRepository.save(data)
    }
}