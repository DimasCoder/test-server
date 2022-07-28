import { Controller, Get, UseGuards, Request, Post, Patch, Body, Req, Param } from '@nestjs/common'
import { UserService } from '@modules/user/user.service'
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard'
import { Roles } from 'src/common/enums/role.enum'
import { RolesGuard } from './guards/role.guard'
import { UpdateBossDto } from './dto/update-boss.dto'

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard([Roles.ADMIN, Roles.BOSS, Roles.USER]))
  @Get('/')
  async getUsers(@Request() req) {
    const { user } = req
    if (user.role === Roles.ADMIN) {
      return this.userService.getAllUsers()
    }
    else if (user.role === Roles.BOSS) {
      return this.userService.getBossUsers(user.id)
    }
    else if (user.role === Roles.USER) {
      return this.userService.getUserById(user.id)
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard([Roles.BOSS]))
  @Patch('/boss/:id')
  async updateUserBoss(@Body() boss_id: UpdateBossDto, @Param('id') id: number, @Request() req) {
    const { user } = req
    return this.userService.updateUserBoss(boss_id, id, user.id)
  }
}
