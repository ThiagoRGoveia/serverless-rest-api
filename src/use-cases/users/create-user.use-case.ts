import { CreateUserDto } from '../../functions/users/dtos/create-user.dto';
import { User } from '../../models/user.model';
import { UserRepository } from '../../repositories/user.repository';

type Response<T> = {
  body: Object;
};

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userDto: CreateUserDto): Promise<Response<User>> {
    const userAlreadyExists = await this.userRepository.exists(userDto);
    if (userAlreadyExists) {
      throw new Error('User already exists');
    }
    const user = await this.userRepository.save(userDto);
    return {
      body: user,
    };
  }
}
