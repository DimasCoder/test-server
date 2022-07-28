import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from '@modules/user/entities/user.entity'
import { AuthController } from '@modules/auth/auth.controller'
import { AuthService } from '@modules/auth/auth.service'
import { UserModule } from '@modules/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy'
import { UserService } from '@modules/user/user.service'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { jwtConstants } from 'src/common/constants/auth-secret.constant'

@Module({
  imports: [SequelizeModule.forFeature([User]), UserModule, PassportModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: 3600 },
  }),],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule { }
