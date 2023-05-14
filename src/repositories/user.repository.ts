import { GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { DynamoDBClient } from '../clients/dynamo-db.client';
import { CreateUserDto } from '../functions/users/dtos/create-user.dto';
import { User } from '../models/user.model';

export class UserRepository {
  constructor(private readonly dynamoDbClient: DynamoDBClient) {}
  async exists(user: CreateUserDto): Promise<boolean> {
    const email = user.email;
    const userData = await this.dynamoDbClient.client.send(
      new GetItemCommand({
        TableName: this.dynamoDbClient.tableName,
        Key: marshall({
          pk: '#USER',
          sk: `#EMAIL_${email}`,
        }),
      })
    );
    return !!userData.Item;
  }
  async save(userDto: CreateUserDto): Promise<User> {
    const user = User.fromDto(userDto);
    const userDbSchema = user.toDynamoDB();
    await this.dynamoDbClient.client.send(
      new PutItemCommand({
        TableName: this.dynamoDbClient.tableName,
        Item: marshall(userDbSchema),
      })
    );
    return user;
  }
}