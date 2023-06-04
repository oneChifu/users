import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, FilterQuery } from 'mongoose'
import { State, StateDocument } from './states.schema'

@Injectable()
export class StatesService {
  constructor(
    @InjectModel(State.name)
    private readonly stateModel: Model<StateDocument>
  ) {}

  async getStates(params: Record<string, any>): Promise<State[]> {
    const {
      limit = 0 as number,
      page = 1 as number,
      sort = 'asc' as 'asc' | 'desc',
      ...searchParams
    } = params

    const skip = (page - 1) * limit
    const sorting = sort === 'desc' ? -1 : 1
    const query: FilterQuery<State> = {}

    Object.entries(searchParams).forEach(([key, value]) => {
      query[key] = new RegExp(value, 'i')
    })

    const result = await this.stateModel
      .find(query)
      .sort({ name: sorting })
      .skip(skip)
      .limit(limit)
      .exec()

    return result
  }

  async getStateById(id: string): Promise<State | null> {
    return this.stateModel.findById(id).exec()
  }
}
