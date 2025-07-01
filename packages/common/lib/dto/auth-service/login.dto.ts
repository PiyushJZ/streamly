import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
} from 'class-validator';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

@ValidatorConstraint({ name: 'HasEmailOrUsername', async: false })
export class HasEmailOrUsernameConstraint
  implements ValidatorConstraintInterface
{
  validate(_: any, args: ValidationArguments): boolean {
    const object = args.object as LoginDto;
    const hasEmail = object.email !== undefined && object.email !== '';
    const hasUsername = object.username !== undefined && object.username !== '';
    const hasPassword =
      typeof object.password === 'string' && object.password.length > 0;

    return (
      hasPassword && ((hasEmail && !hasUsername) || (!hasEmail && hasUsername))
    );
  }
}

export class LoginDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty()
  @Transform(({ value }) => value.trim().toLowerCase())
  readonly email!: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @Transform(({ value }) => value.trim())
  readonly username!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty()
  @Transform(({ value }) => value.trim())
  readonly password!: string;

  @Validate(HasEmailOrUsernameConstraint)
  private readonly _eitherEmailOrUsername!: undefined;
}

export class LoginResponseDto {
  @IsNotEmpty()
  @ApiResponseProperty()
  readonly userId!: string;

  @IsNotEmpty()
  @ApiResponseProperty()
  readonly accessToken!: string;

  @IsNotEmpty()
  @ApiResponseProperty()
  readonly refreshToken!: string;

  @IsNotEmpty()
  @ApiResponseProperty()
  readonly sessionId!: string;
}
