import { RegisterUserDto } from '@modules/auth/dto/register-user.dto'
import { User } from '@modules/user/entities/user.entity'
import { UserService } from '@modules/user/user.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/sequelize'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private userRepository: typeof User,
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async registerUser(registrationData: RegisterUserDto) {
    const { email, password } = registrationData
    const user = await this.userService.getUserByEmail(email)

    if (user) throw new BadRequestException('User already exists.')

    const hashedPassword = await bcrypt.hash(password, 10)

    const createdUser = await this.userRepository.create({
      ...registrationData,
      password: hashedPassword,
    })

    createdUser.password = undefined

    return createdUser
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email)

    const isPasswordMatching = await bcrypt.compare(password, user.password)

    if (!isPasswordMatching) throw new BadRequestException('Invalid credentials.')

    if (user) {
      const { password, ...result } = user;
      return result;
    }

    return null
  }

  async login(email: string) {
    const user = await this.userService.getUserByEmail(email)
    const payload = { id: user.id, email: email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
