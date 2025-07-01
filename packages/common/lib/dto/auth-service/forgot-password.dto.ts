import { IsEmail, IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  @Transform(({ value }) => value.trim().toLowerCase())
  readonly email!: string;
}

export class ForgotPasswordResponseDto {
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
