import { JsonController, Post, Body, Res, Patch, Param } from 'routing-controllers'
import { UserService } from '../service/userService';

@JsonController('/user')
export class UserController {

    private userService = new UserService();

    @Post()
    async createUser(@Body() body: any, @Res() response: any) {

        const existUser = await this.userService.findOne({ where: { email: body.email } })
        if (existUser) {
            return response.status(400).send({
                status: 0,
                message: 'Email already exists.'
            })
        }

        await this.userService.createUser(body);

        return response.status(201).send({
            status: 1,
            message: 'User created successFully'
        })
    }

    @Patch("/:userId/last-seen")
    async updateLastSeen(
        @Param("userId") userId: string,
        @Res() response: any
    ) {

        const user = await this.userService.findOne({
            where: { id: userId },
        });

        if (!user) {
            return response.status(404).send({
                status: 0,
                message: 'User Not Found.'
            })
        }

        user.lastSeen = new Date();

        await this.userService.update(user);

       return response.status(201).send({
            status: 1,
            message: 'Last seen updated successFully'
        })
    }
}