import { DynamoDBClient } from '../../clients/dynamo-db.client';
import { UserRepository } from '../../repositories/user.repository';
import { CreateUserUseCase } from '../../use-cases/users/create-user.use-case';

export function createUserFactory() {
  return new CreateUserUseCase(new UserRepository(new DynamoDBClient(process.env.DYNAMO_DB_TABLE as string)));
}
