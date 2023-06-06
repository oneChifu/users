import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query
} from '@nestjs/common'
import { CreateUpdateDto } from './users.create-update.dto'
import { validate } from 'class-validator'
import { ParamsDto } from './users.params.dto'
import { UsersService } from './users.service'
import { User } from './users.schema'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@Query() params: ParamsDto): Promise<{
    users: User[]
    page: number
    limit: number
    total: number
  } | null> {
    return this.usersService.getUsers(params)
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findById(id)
  }

  @Post()
  async create(
    @Body() createUserDto: CreateUpdateDto
  ): Promise<User | { errors: string[] }> {
    const validationErrors = await validate(createUserDto)

    if (validationErrors.length > 0) {
      const errors = validationErrors.map((error) => error.property)
      return { errors }
    }

    return this.usersService.create(createUserDto)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUpdateDto
  ): Promise<User | { errors: string[] }> {
    const validationErrors = await validate(updateUserDto)

    if (validationErrors.length > 0) {
      const errors = validationErrors.map((error) => error.property)
      return { errors }
    }

    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User | null> {
    return this.usersService.delete(id)
  }
}
