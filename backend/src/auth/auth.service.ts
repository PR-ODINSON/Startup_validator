import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  async register(registerDto: RegisterDto) {
    // TODO: Implement user registration with Supabase
    return {
      message: 'User registered successfully',
      user: {
        id: '1',
        email: registerDto.email,
        name: registerDto.name,
      },
    };
  }

  async login(loginDto: LoginDto) {
    // TODO: Implement user login with Supabase
    if (loginDto.email === 'test@test.com' && loginDto.password === 'password') {
      return {
        access_token: 'mock-token',
        user: {
          id: '1',
          email: loginDto.email,
          name: 'Test User',
        },
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async getProfile(userId: string) {
    // TODO: Implement get user profile from Supabase
    return {
      id: userId,
      email: 'test@test.com',
      name: 'Test User',
      createdAt: new Date().toISOString(),
    };
  }
} 