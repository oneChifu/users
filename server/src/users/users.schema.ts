import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { AutoIncrementID } from '@typegoose/auto-increment'

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop({ type: Number, unique: true })
  id: number

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

  @Prop({ required: false })
  state: string

  @Prop({ required: false })
  city: string

  @Prop({ required: true })
  address: string

  @Prop({ required: true })
  pincode: string

  @Prop({ default: Date.now })
  createdAt: number
}

export const UserSchema = SchemaFactory.createForClass(User)
UserSchema.plugin(AutoIncrementID, { field: 'id', startAt: 1 })
