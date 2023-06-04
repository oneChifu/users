import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type CountryDocument = Country & Document

@Schema()
export class Country {
  @Prop()
  id: number

  @Prop()
  name: string

  @Prop()
  iso3: string

  @Prop()
  iso2: string

  @Prop()
  numeric_code: number

  @Prop()
  phone_code: number

  @Prop()
  capital: string

  @Prop()
  currency: string

  @Prop()
  currency_name: string

  @Prop()
  currency_symbol: string

  @Prop()
  tld: string

  @Prop()
  native: string

  @Prop()
  region: string

  @Prop()
  subregion: string

  @Prop({ type: [String] })
  timezones: string[]

  @Prop()
  latitude: number

  @Prop()
  longitude: number

  @Prop()
  emoji: string

  @Prop()
  emojiU: string
}

export const CountrySchema = SchemaFactory.createForClass(Country)
