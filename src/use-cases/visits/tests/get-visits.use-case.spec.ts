import { GetVisitsUseCase } from '../get-visits.use-case';
import { VISITS_KEY } from '../constants';

describe('GetVisitsUseCase', () => {
  let counterRepositoryMock;
  let useCase: GetVisitsUseCase;

  beforeEach(() => {
    counterRepositoryMock = {
      get: jest.fn(),
    };
    useCase = new GetVisitsUseCase(counterRepositoryMock);
  });

  it('should return the number of visits', async () => {
    const expectedVisits = 10;
    counterRepositoryMock.get.mockResolvedValue(expectedVisits);

    const result = await useCase.execute();

    expect(result).toEqual(expectedVisits);
    expect(counterRepositoryMock.get).toHaveBeenCalledWith(VISITS_KEY);
  });
});
