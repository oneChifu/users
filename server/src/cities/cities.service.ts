import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, FilterQuery } from 'mongoose'
import { City, CityDocument } from './cities.schema'

@Injectable()
export class CitiesService {
  constructor(
    @InjectModel(City.name)
    private readonly cityModel: Model<CityDocument>
  ) {}

  async getCities(params: Record<string, any>): Promise<City[]> {
    const {
      limit = 0 as number,
      page = 1 as number,
      sort = 'asc' as 'asc' | 'desc',
      ...searchParams
    } = params

    const skip = (page - 1) * limit
    const sorting = sort === 'desc' ? -1 : 1
    const query: FilterQuery<City> = {}

    Object.entries(searchParams).forEach(([key, value]) => {
      query[key] = new RegExp(`\\b${value}\\b`, 'i')
    })

    return this.cityModel
      .find(query)
      .sort({ name: sorting })
      .skip(skip)
      .limit(limit)
      .exec()
  }

  async getCityById(id: string): Promise<City | null> {
    return this.cityModel.findById(id).exec()
  }
}
