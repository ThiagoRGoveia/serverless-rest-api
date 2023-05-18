import { User } from '../../../models/user.model';
import { GetUserUseCase } from '../get-user.use-case';
import { HttpError } from '../../../../src/errors/http.error';
import { plainToInstance } from 'class-transformer';

describe('GetUserUseCase', () => {
  let userRepositoryMock;
  let useCase: GetUserUseCase;

  beforeEach(() => {
    userRepositoryMock = {
      findByID: jest.fn(),
    };
    useCase = new GetUserUseCase(userRepositoryMock);
  });

  it('should throw an HttpError if user is not found', async () => {
    userRepositoryMock.findByID.mockResolvedValue(null);

    const email = 'test@example.com';

    await expect(useCase.execute(email)).rejects.toThrow(HttpError);
    expect(userRepositoryMock.findByID).toHaveBeenCalledWith(email);
  });

  it('should return the user if the user is found', async () => {
    const expectedUser: User = plainToInstance(User, {
      pk: '#USER',
      sk: ';#EMAIL#test@test',
      name: 'John Doe',
      email: 'test@test',
    });
    userRepositoryMock.findByID.mockResolvedValue(expectedUser);

    const email = 'test@example.com';

    const result = await useCase.execute(email);

    expect(result).toEqual({ body: expectedUser });
    expect(userRepositoryMock.findByID).toHaveBeenCalledWith(email);
  });
});
