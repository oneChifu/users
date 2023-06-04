import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, FilterQuery } from 'mongoose'
import { Country, CountryDocument } from './countries.schema'

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<CountryDocument>
  ) {}

  async getCountries(params: Record<string, any>): Promise<Country[]> {
    const {
      limit = 0 as number,
      page = 1 as number,
      sort = 'asc' as 'asc' | 'desc',
      ...searchParams
    } = params

    const skip = (page - 1) * limit
    const sorting = sort === 'desc' ? -1 : 1
    const query: FilterQuery<Country> = {}

    Object.entries(searchParams).forEach(([key, value]) => {
      query[key] = new RegExp(value, 'i')
    })

    return this.countryModel
      .find(query)
      .sort({ name: sorting })
      .skip(skip)
      .limit(limit)
      .exec()
  }

  async getCountryById(id: string): Promise<Country | null> {
    return this.countryModel.findById(id).exec()
  }
}
