import { Controller, Get, Param, Query } from '@nestjs/common'
import { StatesService } from './states.service'

@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Get()
  async getStates(@Query() params: Record<string, any>) {
    return this.statesService.getStates(params)
  }

  @Get(':id')
  async getStateById(@Param('id') id: string) {
    return this.statesService.getStateById(id)
  }
}
