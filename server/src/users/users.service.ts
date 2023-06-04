import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, FilterQuery } from 'mongoose'
import { CreateUpdateUserDto } from './create-update-user.dto'
import { User, UserDocument } from './user.schema'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUsers(
    params: Record<string, any>
  ): Promise<{ users: User[]; page: number; limit: number; total: number }> {
    const {
      limit = 5 as number,
      page = 1 as number,
      sort = 'desc' as 'asc' | 'desc',
      ...searchParams
    } = params

    const skip = (page - 1) * limit
    const sorting = sort === 'desc' ? -1 : 1
    const query: FilterQuery<User> = {}

    Object.entries(searchParams).forEach(([key, value]) => {
      query[key] = new RegExp(value, 'i')
    })

    const total = await this.userModel.find(query).countDocuments().exec()
    const users = await this.userModel
      .find(query)
      .sort({ createdAt: sorting })
      .skip(skip)
      .limit(limit)
      .exec()

    return { users, page, limit, total }
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec()
  }

  async create(createUserDto: CreateUpdateUserDto): Promise<User> {
    const createdUser = new this.userModel({
      ...createUserDto,
      createdAt: Date.now()
    })
    return createdUser.save()
  }

  async update(
    id: string,
    updateUserDto: CreateUpdateUserDto
  ): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec()
  }

  async delete(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec()
  }
}
