import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: String;

    @Column()
    name: String;

    @Column()
    email: String;

    @Column()
    lastSeen: Date;

    @CreateDateColumn()
    createdAt: Date;
}