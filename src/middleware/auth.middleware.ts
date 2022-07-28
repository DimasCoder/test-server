import { verify } from 'jsonwebtoken';
import { NestMiddleware, Injectable, ForbiddenException } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '@modules/user/user.service';
import { jwtConstants } from 'src/common/constants/auth-secret.constant';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) { }

    async use(req: Request | any, res: Response, next: () => void) {
        const bearerHeader = req.headers.authorization;
        const accessToken = bearerHeader && bearerHeader.split(' ')[1];
        let user, jwtData;

        if (!bearerHeader || !accessToken) {
            return next();
        }

        try {
            jwtData = verify(
                accessToken,
                jwtConstants.secret,
            );
            user = await this.userService.getUserByEmail(jwtData.email);
        } catch (error) {
            throw new ForbiddenException('Please register or sign in.');
        }

        if (user) {
            req.user = user;
        }

        next();
    }
}