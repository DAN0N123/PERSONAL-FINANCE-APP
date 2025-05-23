import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a user', () => {
    const dto: CreateUserDto = { email: 'a@a.com', name: 'Test' };
    expect(service.create(dto)).toEqual({
      message: 'User created successfully!',
      user: dto,
    });
  });
});
