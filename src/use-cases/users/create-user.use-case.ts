import { HttpError } from '../../../src/errors/http.error';
import { CreateUserDto } from '../../functions/users/dtos/create-user.dto';
import { User } from '../../models/user.model';
import { UserRepository } from '../../repositories/user.repository';
import { Response } from '../types';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userDto: CreateUserDto): Promise<Response<User>> {
    const userAlreadyExists = await this.userRepository.exists(userDto);
    if (userAlreadyExists) {
      throw new HttpError({ statusCode: 400, message: 'User already exists' });
    }
    const user = await this.userRepository.save(userDto);
    return {
      body: user,
    };
  }
}
