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
import { UsersService } from './users.service'
import { CreateUpdateUserDto } from './create-update-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@Query() params: Record<string, any>) {
    return this.usersService.getUsers(params)
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.usersService.findById(id)
  }

  @Post()
  async create(@Body() createUserDto: CreateUpdateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUpdateUserDto
  ) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id)
  }
}
