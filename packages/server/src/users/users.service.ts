import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User()
    const { email, passwordHash, firstName, lastName } = createUserDto
    user.email = email.toLowerCase()
    user.passwordHash = passwordHash
    user.firstName = firstName
    user.lastName = lastName

    return this.usersRepository.save(user)
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id)
  }

  findOneByEmailWithPasswordHash(email: string): Promise<User> {
    return this.usersRepository
      .createQueryBuilder()
      .where({
        email: email.toLowerCase(),
      })
      .addSelect('"User"."password_hash" as "User_password_hash"')
      .getOne()
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id)
  }
}
