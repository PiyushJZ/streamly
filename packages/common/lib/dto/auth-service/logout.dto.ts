import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';
import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseRequestDto } from '../base.dto';

export class LogoutDto extends BaseRequestDto {}

export class LogoutResponseDto {
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
