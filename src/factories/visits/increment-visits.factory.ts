import { CounterRepository } from '../../repositories/counter.repository';
import { DynamoDBClient } from '../../clients/dynamo-db.client';
import { IncrementVisitsUseCase } from '../../use-cases/visits/increment-visits.use-case';

export function incrementVisitsFactory() {
  return new IncrementVisitsUseCase(new CounterRepository(new DynamoDBClient(process.env.DYNAMO_DB_TABLE as string)));
}
