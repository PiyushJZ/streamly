import { IsNotEmpty, IsUUID, IsString } from 'class-validator';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class BaseRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty()
  @Transform(({ value }) => value.trim())
  readonly userId!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @Transform(({ value }) => value.trim())
  readonly accessToken!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @Transform(({ value }) => value.trim())
  readonly sessionId!: string;
}
