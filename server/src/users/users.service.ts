import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, FilterQuery } from 'mongoose'
import { CreateUpdateDto } from './users.create-update.dto'
import { User, UserDocument } from './users.schema'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUsers(
    params: Record<string, any>
  ): Promise<{ users: User[]; page: number; limit: number; total: number }> {
    const {
      limit = 5 as number,
      page = 1 as number,
      sortBy = 'id' as string,
      sortDesc,
      ...searchParams
    } = params

    const skip = (page - 1) * limit
    const sortingBy = !sortBy ? 'id' : sortBy
    const sortingDesc = !!sortDesc ? -1 : 1
    const query: FilterQuery<User> = {}

    Object.entries(searchParams).forEach(([key, value]) => {
      query[key] = new RegExp(value, 'i')
    })

    const total = await this.userModel.find(query).countDocuments().exec()
    const users = await this.userModel
      .find(query)
      .sort({ [sortingBy]: sortingDesc })
      .skip(skip)
      .limit(limit)
      .exec()

    return { users, page, limit, total }
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec()
  }

  async create(
    createUserDto: CreateUpdateDto
  ): Promise<User | { errors: string[] }> {
    const createdUser = new this.userModel({
      ...createUserDto,
      createdAt: Date.now()
    })

    return createdUser.save()
  }

  async update(
    id: string,
    updateUserDto: CreateUpdateDto
  ): Promise<User | { errors: string[] }> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec()
  }

  async delete(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec()
  }
}
