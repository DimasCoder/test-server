import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import { jwtConstants } from 'src/common/constants/auth-secret.constant';
import { Roles } from '../../../common/enums/role.enum';

export const RolesGuard = (role: Roles[]): Type<CanActivate> => {
    class RoleGuardMixin implements CanActivate {
        canActivate(context: ExecutionContext) {
            const request = context.switchToHttp().getRequest();

            const bearerHeader = request.headers.authorization;
            const accessToken = bearerHeader && bearerHeader.split(' ')[1];

            let jwtData;
            try {
                jwtData = jwt.verify(
                    accessToken,
                    jwtConstants.secret,
                )
            } catch (err) {
                throw Error(err)
            }
            return role.includes(jwtData.role);
        }
    }

    return mixin(RoleGuardMixin);
}

