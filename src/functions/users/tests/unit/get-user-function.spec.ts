import { handler } from '../../get-user-function';
import { getUserFactory } from '../../../../factories/users/get-user.factory';

jest.mock('../../../../factories/users/get-user.factory', () => ({
  getUserFactory: jest.fn(),
}));

describe('Handler', () => {
  const userFactoryMock = {
    execute: jest.fn(),
  };

  beforeEach(() => {
    (getUserFactory as jest.Mock).mockReturnValue(userFactoryMock);
  });

  it('should get a user and return a successful response', async () => {
    const email = 'test@example.com';
    const event = {
      pathParameters: {
        email: email,
      },
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
      statusCode: 200,
      body: JSON.stringify(responseBody),
    });
    expect(getUserFactory).toHaveBeenCalled();
    expect(userFactoryMock.execute).toHaveBeenCalledWith(email);
  });

  it('should return an error response if an error occurs', async () => {
    const email = 'test@example.com';
    const event = {
      pathParameters: {
        email: email,
      },
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
