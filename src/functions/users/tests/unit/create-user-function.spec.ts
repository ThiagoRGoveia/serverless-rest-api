import { plainToInstance } from 'class-transformer';
import { handler } from '../../create-user-function';
import { createUserFactory } from '../../../../factories/users/create-user.factory';
import { CreateUserDto } from '../../dtos/create-user.dto';

jest.mock('class-transformer', () => ({
  plainToInstance: jest.fn(),
}));

jest.mock('../../../../factories/users/create-user.factory', () => ({
  createUserFactory: jest.fn(),
}));

describe('Handler', () => {
  let userDto: CreateUserDto = new CreateUserDto();
  const userFactoryMock = {
    execute: jest.fn(),
  };

  beforeEach(() => {
    (createUserFactory as jest.Mock).mockReturnValue(userFactoryMock);
    (plainToInstance as jest.Mock).mockReturnValue(userDto);
    userDto.validate = jest.fn().mockResolvedValue(undefined);
  });

  it('should create a new user and return a successful response', async () => {
    const event = {
      body: JSON.stringify({}),
    };

    const responseBody = {
      pk: '#USER',
      sk: '#EMAIL#test@emailcom',
      email: 'test@emailcom',
      name: 'Test User',
    };
    userFactoryMock.execute.mockResolvedValue({ body: responseBody });

    const result = await handler(event as any, null, null);

    expect(result).toEqual({
      statusCode: 201,
      body: JSON.stringify(responseBody),
    });
    expect(createUserFactory).toHaveBeenCalled();
    expect(plainToInstance).toHaveBeenCalledWith(CreateUserDto, {});
    expect(userDto.validate).toHaveBeenCalled();
    expect(userFactoryMock.execute).toHaveBeenCalledWith(userDto);
  });

  it('should return an error response if an error occurs', async () => {
    const event = {
      body: JSON.stringify({}),
    };

    const error = { statusCode: 400, message: 'Error message' };
    userFactoryMock.execute.mockRejectedValue(error);

    const result = await handler(event as any, null, null);

    expect(result).toEqual({
      statusCode: error.statusCode,
      body: error.message,
    });
  });
});
