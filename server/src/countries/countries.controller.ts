import { Controller, Get, Param, Query } from '@nestjs/common'
import { CountriesService } from './countries.service'

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  async getCountries(@Query() params: Record<string, any>) {
    return this.countriesService.getCountries(params)
  }

  @Get(':id')
  async getCountryById(@Param('id') id: string) {
    return this.countriesService.getCountryById(id)
  }
}
