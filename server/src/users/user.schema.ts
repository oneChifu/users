import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string

  @Prop({ required: true })
  lastName: string

  @Prop({ required: true })
  birthDate: string

  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  gender: number

  @Prop({ required: true })
  country: string

  @Prop({ required: true })
  state: string

  @Prop({ required: true })
  city: string

  @Prop({ required: true })
  address: string

  @Prop({ required: true })
  pincode: number

  @Prop({ default: Date.now })
  createdAt: number
}

export const UserSchema = SchemaFactory.createForClass(User)
