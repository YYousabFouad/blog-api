import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Role } from './enums/role.enum';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = {
    create: jest.fn(),
    findByEmail: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should create a new user via UsersService', async () => {
      const dto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };
      const expectedResult = {
        _id: '507f1f77bcf86cd799439011',
        name: dto.name,
        email: dto.email,
        role: Role.User,
      };
      mockUsersService.create.mockResolvedValue(expectedResult);

      const result = await service.register(dto);

      expect(mockUsersService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('login', () => {
    it('should throw UnauthorizedException when user is not found', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      await expect(
        service.login({
          email: 'missing@example.com',
          password: 'password123',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when password does not match', async () => {
      mockUsersService.findByEmail.mockResolvedValue({
        _id: '507f1f77bcf86cd799439011',
        email: 'john@example.com',
        password: 'hashed_password',
        role: Role.User,
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.login({ email: 'john@example.com', password: 'wrongpassword' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return an accessToken with sub, email, and role in payload', async () => {
      mockUsersService.findByEmail.mockResolvedValue({
        _id: '507f1f77bcf86cd799439011',
        email: 'admin@example.com',
        password: 'hashed_password',
        role: Role.Admin,
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue('signed_jwt_token');

      const result = await service.login({
        email: 'admin@example.com',
        password: 'correctpassword',
      });

      expect(mockJwtService.sign).toHaveBeenCalledWith({
        sub: '507f1f77bcf86cd799439011',
        email: 'admin@example.com',
        role: Role.Admin,
      });
      expect(result).toEqual({ accessToken: 'signed_jwt_token' });
    });
  });
});
