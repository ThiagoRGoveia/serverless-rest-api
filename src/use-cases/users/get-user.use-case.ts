import { User } from '../../models/user.model';
import { HttpError } from '../../../src/errors/http.error';
import { UserRepository } from '../../repositories/user.repository';
import { Response } from '../types';

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string): Promise<Response<User>> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new HttpError({ statusCode: 404, message: 'User not found' });
    }
    return {
      body: user,
    };
  }
}
