import { Observable } from 'rxjs';
import { LoginDto, LoginResponseDto } from '../dto/auth-service/login.dto';
import { LogoutDto, LogoutResponseDto } from '../dto/auth-service/logout.dto';
import { SignupDto, SignupResponseDto } from '../dto/auth-service/signup.dto';
import {
  ForgotPasswordDto,
  ForgotPasswordResponseDto,
} from '../dto/auth-service/forgot-password.dto';

export interface IAuthService {
  login(data: LoginDto): Observable<LoginResponseDto>;
  signup(data: SignupDto): Observable<SignupResponseDto>;
  logout(data: LogoutDto): Observable<LogoutResponseDto>;
  forgotPassword(
    data: ForgotPasswordDto,
  ): Observable<ForgotPasswordResponseDto>;
}

export type AccessTokenPayload = {
  id: string;
  email: string;
  username: string;
  verified: boolean;
  refreshToken: string;
};
