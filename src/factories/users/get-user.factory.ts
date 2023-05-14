import { DynamoDBClient } from '../../clients/dynamo-db.client';
import { UserRepository } from '../../repositories/user.repository';
import { GetUserUseCase } from '../../use-cases/users/get-user.use-case';

export function getUserFactory() {
  return new GetUserUseCase(new UserRepository(new DynamoDBClient(process.env.DYNAMO_DB_TABLE as string)));
}
