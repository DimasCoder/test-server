import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from '@modules/user/entities/user.entity'
import { UpdateBossDto } from './dto/update-boss.dto'

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) { }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      attributes: ['first_name', 'last_name', 'email', 'role'],
    })

    return users
  }

  async getBossUsers(id: number) {
    return await this.userRepository.findAll({ where: { user_id: id }, include: [User], raw: true, attributes: ['first_name', 'last_name', 'email', 'role'], })
  }

  async getUserById(id: number) {
    return await this.userRepository.findByPk(id, { attributes: ['first_name', 'last_name', 'email', 'role', 'user_id'] })
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } })
  }

  async updateUserBoss(new_boss_id: UpdateBossDto, id: number, boss_id: number) {
    const user = await this.getUserById(id);
    if (user.user_id !== boss_id) {
      throw new BadRequestException('Its not your subordinate.')
    }
    return await this.userRepository.update(new_boss_id, { where: { id } })
  }
}
