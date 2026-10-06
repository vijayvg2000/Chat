import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { useExpressServer } from 'routing-controllers';
import { AppDataSource } from './config/database'

const app = express();

app.use(express.json());

useExpressServer(app, {
    routePrefix: '/api',
    controllers: [__dirname + '/controller/**.{ts,js}'],
    middlewares: [__dirname + '/middleware/**.{ts,js}'],

    validation: true,
    defaultErrorHandler: false,
})

AppDataSource.initialize().then(() => {

    app.listen(process.env.PORT, () => {
        console.log('Server running on port : ', process.env.PORT)
    })
}).catch((error) => {
    console.log('Database connection failed: ', error)
})


