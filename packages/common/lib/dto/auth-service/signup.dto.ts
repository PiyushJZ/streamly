import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  @Transform(({ value }) => value.trim().toLowerCase())
  readonly email!: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  @ApiProperty()
  @Transform(({ value }) => value.trim())
  readonly password!: string;
}

export class SignupResponseDto {
  @IsString()
  @IsNotEmpty()
  @ApiResponseProperty()
  readonly message!: string;

  @IsBoolean()
  @ApiResponseProperty()
  readonly success!: boolean;

  @IsBoolean()
  @ApiResponseProperty()
  readonly error!: boolean;
}
