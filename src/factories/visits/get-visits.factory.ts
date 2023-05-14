import { CounterRepository } from '../../repositories/counter.repository';
import { DynamoDBClient } from '../../clients/dynamo-db.client';
import { GetVisitsUseCase } from '../../use-cases/visits/get-visits.use-case';

export function getVisitsFactory() {
  return new GetVisitsUseCase(new CounterRepository(new DynamoDBClient(process.env.DYNAMO_DB_TABLE as string)));
}
