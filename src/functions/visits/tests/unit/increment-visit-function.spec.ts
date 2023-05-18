import { handler } from '../../increment-visit-function';
import { incrementVisitsFactory } from '../../../../factories/visits/increment-visits.factory';

jest.mock('../../../../factories/visits/increment-visits.factory', () => ({
  incrementVisitsFactory: jest.fn(),
}));

describe('Handler', () => {
  const visitsFactoryMock = {
    execute: jest.fn(),
  };

  beforeEach(() => {
    (incrementVisitsFactory as jest.Mock).mockReturnValue(visitsFactoryMock);
  });

  it('should increment visits and return a successful response', async () => {
    const event = {};

    const visitCount = 10;
    visitsFactoryMock.execute.mockResolvedValue(visitCount);

    const result = await handler(event as any, undefined as any, undefined as any);

    expect(result).toEqual({
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visits: visitCount,
      }),
    });
    expect(incrementVisitsFactory).toHaveBeenCalled();
    expect(visitsFactoryMock.execute).toHaveBeenCalled();
  });

  it('should return an error response if an error occurs', async () => {
    const event = {};

    const error = { statusCode: 400, message: 'Error message' };
    visitsFactoryMock.execute.mockRejectedValue(error);

    const result = await handler(event as any, undefined as any, undefined as any);

    expect(result).toEqual({
      statusCode: error.statusCode,
      headers: { 'Content-Type': 'application/json' },
      body: error.message,
    });
    expect(incrementVisitsFactory).toHaveBeenCalled();
    expect(visitsFactoryMock.execute).toHaveBeenCalled();
  });
});
