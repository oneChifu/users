import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type CityDocument = City & Document

@Schema()
export class City {
  @Prop()
  id: number

  @Prop()
  name: string

  @Prop()
  state_id: number

  @Prop()
  state_code: string

  @Prop()
  state_name: string

  @Prop()
  country_id: number

  @Prop()
  country_code: string

  @Prop()
  country_name: string

  @Prop()
  latitude: number

  @Prop()
  longitude: number

  @Prop()
  wikiDataId: string
}

export const CitySchema = SchemaFactory.createForClass(City)
