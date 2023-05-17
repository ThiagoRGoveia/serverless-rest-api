import { IncrementVisitsUseCase } from '../increment-visits.use-case';
import { VISITS_KEY } from '../constants';

describe('IncrementVisitsUseCase', () => {
  let counterRepositoryMock;
  let useCase: IncrementVisitsUseCase;

  beforeEach(() => {
    counterRepositoryMock = {
      increment: jest.fn(),
    };
    useCase = new IncrementVisitsUseCase(counterRepositoryMock);
  });

  it('should increment the number of visits and return the new count', async () => {
    const expectedVisits = 11;
    counterRepositoryMock.increment.mockResolvedValue(expectedVisits);

    const result = await useCase.execute();

    expect(result).toEqual(expectedVisits);
    expect(counterRepositoryMock.increment).toHaveBeenCalledWith(VISITS_KEY);
  });
});
