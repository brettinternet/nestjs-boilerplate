import {
  Body,
  Controller,
  Delete,
  Post,
  Request,
  Get,
  UseGuards,
} from '@nestjs/common'

import { CustomRequest } from 'src/auth/auth.controller'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { CreateUserDto } from '@packages/common/build/create-user.dto'
import { UsersService } from './users.service'
import { User } from './user.entity'

@Controller('api/user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Request() req: CustomRequest) {
    return req.user
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Request() req: CustomRequest): Promise<void> {
    const { id } = req.user
    return this.usersService.remove(id.toString())
  }
}
