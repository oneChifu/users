import {
  IsString,
  IsInt,
  IsIn,
  IsISO8601,
  IsOptional,
  Max
} from 'class-validator'

export class ParamsDto {
  @IsInt()
  readonly page: number

  @IsInt()
  readonly limit: number

  @IsString()
  readonly sortBy: string

  @IsOptional()
  @IsString()
  readonly sortDesc?: boolean

  @IsString()
  readonly firstName: string

  @IsString()
  readonly lastName: string

  @IsISO8601()
  readonly birthDate: string

  @IsString()
  readonly email: string

  @IsIn([1, 2])
  readonly gender: number

  @IsString()
  readonly country: string

  @IsString()
  readonly state: string

  @IsString()
  readonly city: string

  @IsString()
  @Max(80)
  readonly address: string

  @IsInt()
  readonly pincode: number
}
