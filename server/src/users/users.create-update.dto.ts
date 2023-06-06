import {
  IsString,
  IsEmail,
  IsInt,
  IsISO8601,
  Max,
  IsIn,
  IsNotEmpty,
  IsOptional,
  validateSync
} from 'class-validator'
import { plainToClass } from 'class-transformer'

export class CreateUpdateDto {
  @IsNotEmpty()
  @IsString()
  readonly firstName: string

  @IsNotEmpty()
  @IsString()
  readonly lastName: string

  @IsNotEmpty()
  @IsISO8601()
  readonly birthDate: string

  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @IsIn([1, 2])
  readonly gender: number

  @IsNotEmpty()
  @IsString()
  readonly country: string

  @IsOptional()
  readonly state?: string

  @IsOptional()
  readonly city?: string

  @IsNotEmpty()
  @IsString()
  @Max(80)
  readonly address: string

  @IsNotEmpty()
  @IsString()
  readonly pincode: string

  validate(): string[] {
    const errors = validateSync(plainToClass(CreateUpdateDto, this), {
      skipMissingProperties: false
    })

    return errors.map((error) => {
      const constraints = Object.values(error.constraints)
      return constraints[0]
    })
  }
}
