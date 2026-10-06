import "reflect-metadata";
import { DataSource } from 'typeorm';
import path from 'path';

export const AppDataSource = new DataSource({
 
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,

    entities: [path.join(__dirname, '../model/**.{ts,js}')],
    
    synchronize: true,
    logging: true
})