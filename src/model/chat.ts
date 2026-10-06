import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity('chats')
export class Chat {

    @PrimaryGeneratedColumn()
    id: String;

    @Column()
    userAId: String;

    @Column()
    userBId: String;

    @CreateDateColumn()
    createdAt: Date;
}