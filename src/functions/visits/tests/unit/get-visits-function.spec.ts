import { handler } from '../../get-visits-function';
import { getVisitsFactory } from '../../../../factories/visits/get-visits.factory';

jest.mock('../../../../factories/visits/get-visits.factory', () => ({
  getVisitsFactory: jest.fn(),
}));

describe('Handler', () => {
  const visitsFactoryMock = {
    execute: jest.fn(),
  };

  beforeEach(() => {
    (getVisitsFactory as jest.Mock).mockReturnValue(visitsFactoryMock);
  });

  it('should get a visits and return a successful response', async () => {
    visitsFactoryMock.execute.mockResolvedValueOnce(1);
    const result = await handler({} as any, null, null);

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        visits: 1,
      }),
    });
    expect(getVisitsFactory).toHaveBeenCalled();
    expect(visitsFactoryMock.execute).toHaveBeenCalled();
  });

  it('should return an error response if an error occurs', async () => {
    const error = { statusCode: 400, message: 'Error message' };
    visitsFactoryMock.execute.mockRejectedValue(error);

    const result = await handler({} as any, null, null);

    expect(result).toEqual({
      statusCode: error.statusCode,
      body: error.message,
    });
  });
});
