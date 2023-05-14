import { CounterRepository } from '../../repositories/counter.repository';
import { VISITS_KEY } from './constants';

export class GetVisitsUseCase {
  constructor(private readonly counterRepository: CounterRepository) {}

  async execute(): Promise<number> {
    return this.counterRepository.get(VISITS_KEY);
  }
}
