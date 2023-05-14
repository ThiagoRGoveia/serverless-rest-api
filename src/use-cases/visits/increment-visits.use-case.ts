import { CounterRepository } from '../../repositories/counter.repository';
import { VISITS_KEY } from './constants';

export class IncrementVisitsUseCase {
  constructor(private readonly counterRepository: CounterRepository) {}

  async execute(): Promise<number> {
    return this.counterRepository.increment(VISITS_KEY);
  }
}
