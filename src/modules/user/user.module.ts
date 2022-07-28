import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from '@modules/user/entities/user.entity'
import { UserController } from '@modules/user/user.controller'
import { UserService } from '@modules/user/user.service'

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
