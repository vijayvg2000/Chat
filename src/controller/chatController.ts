import { JsonController, Post, Get, Patch, Body, Param, QueryParam, Res, } from "routing-controllers";
import { ChatService } from "../service/chatService";
import { firestore } from "../config/firsebase";
import { response } from "express";
import { AppDataSource } from "../config/database";
import { Chat } from "../model/chat";

@JsonController("/chat")
export class ChatController {

    private chatService = new ChatService();

    @Post("/create")
    async createChat(@Body() body: { userAId: string; userBId: string; }, @Res() response: any) {
        await this.chatService.create(body);
        return response.status(201).send({
            status: 1,
            message: 'chat created successFully'
        })
    }


    @Post("/:chatId/message/send")
    async sendMessage(
        @Param("chatId") chatId: string,
        @Body() body: {
            senderId: string;
            text: string;
        },
        @Res() response: any
    ) {

        const messageRef = firestore.collection('chats')
            .doc(chatId)
            .collection('message')
            .doc()

        const message = {
            id: messageRef.id,
            senderId: body.senderId,
            text: body.text,
            timeStamp: new Date(),
            read: false,
            readAt: null
        }

        await messageRef.set(message);
        return response.status(200).send({
            status: 1,
            message: 'message send successfully'
        })
    }


    @Get("/:chatId/messages")
    async getMessages(
        @Param("chatId") chatId: string,
        @QueryParam("limit") limit: number = 50,
        @Res() response: any
    ) {

        const messageRef = await firestore.collection('chats')
            .doc(chatId)
            .collection('message')
            .orderBy('timestamp', 'asc')
            .limit(+limit)
            .get()

        const message = messageRef.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        })
        );

        return response.status(200).send({
            status: 1,
            message: 'message get successfully',
            data: message
        })
    }


    @Patch("/:chatId/message/:messageId/read")
    async markMessageRead(
        @Param("chatId") chatId: string,
        @Param("messageId") messageId: string
    ) {

        const messageRef = firestore
            .collection("chats")
            .doc(chatId)
            .collection("messages")
            .doc(messageId);

        await messageRef.update({
            read: true,
            readAt: new Date(),
        });

        return response.status(200).send({
            status: 1,
            message: 'message read successfully'
        })
    }

    @Get("/user/:userId/chats")
    async getUserChats(
        @Param("userId") userId: string
    ) {
        const chatRepository =
            AppDataSource.getRepository(Chat);

        const chats = await chatRepository
            .createQueryBuilder("chat")
            .where(
                "chat.userAId = :userId OR chat.userBId = :userId",
                { userId }
            )
            .getMany();

        return response.status(200).send({
            status: 1,
            message: 'fetch chat lists',
            chats
        })
    }
}