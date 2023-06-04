import { Controller, Get, Param, Query } from '@nestjs/common'
import { CitiesService } from './cities.service'

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  async getCities(@Query() params: Record<string, any>) {
    return this.citiesService.getCities(params)
  }

  @Get(':id')
  async getCityById(@Param('id') id: string) {
    return this.citiesService.getCityById(id)
  }
}
