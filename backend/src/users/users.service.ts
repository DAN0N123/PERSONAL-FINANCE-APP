import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    // This is just a mock — replace with real DB logic later
    return {
      message: 'User created successfully!',
      user: createUserDto,
    };
  }

  // Example of a read method
  findAll() {
    return [{ id: 1, name: 'John', email: 'john@example.com' }];
  }
}
