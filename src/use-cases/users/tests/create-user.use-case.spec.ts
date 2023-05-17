import { CreateUserDto } from '../../../functions/users/dtos/create-user.dto';
import { User } from '../../../models/user.model';
import { CreateUserUseCase } from '../create-user.use-case';
import { HttpError } from '../../../../src/errors/http.error';
import { plainToInstance } from 'class-transformer';

describe('CreateUserUseCase', () => {
  let userRepositoryMock;
  let useCase: CreateUserUseCase;

  beforeEach(() => {
    userRepositoryMock = {
      exists: jest.fn(),
      save: jest.fn(),
    };
    useCase = new CreateUserUseCase(userRepositoryMock);
  });

  it('should throw an HttpError if user already exists', async () => {
    userRepositoryMock.exists.mockResolvedValue(true);

    const userDto: CreateUserDto = plainToInstance(CreateUserDto, {
      name: 'John Doe',
      email: 'test@email.com',
    });

    await expect(useCase.execute(userDto)).rejects.toThrow(HttpError);
    expect(userRepositoryMock.exists).toHaveBeenCalledWith(userDto);
  });

  it('should create a new user if user does not exist', async () => {
    userRepositoryMock.exists.mockResolvedValue(false);
    const userDto: CreateUserDto = plainToInstance(CreateUserDto, {
      name: 'John Doe',
      email: 'test@email.com',
    });
    const expectedUser: User = plainToInstance(User, {
      pk: '#USER',
      sk: ';#EMAIL#test@test',
      name: 'John Doe',
      email: 'test@email.com',
    });

    userRepositoryMock.save.mockResolvedValue(expectedUser);

    const result = await useCase.execute(userDto);

    expect(result).toEqual({ body: expectedUser });
    expect(userRepositoryMock.exists).toHaveBeenCalledWith(userDto);
    expect(userRepositoryMock.save).toHaveBeenCalledWith(userDto);
  });
});
