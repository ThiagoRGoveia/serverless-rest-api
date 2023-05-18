import { GetItemCommand, PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { DynamoDBClient } from '../clients/dynamo-db.client';
import { CreateUserDto } from '../functions/users/dtos/create-user.dto';
import { User } from '../models/user.model';

export class UserRepository {
  constructor(private readonly dynamoDbClient: DynamoDBClient) {}
  async exists(userDto: CreateUserDto): Promise<boolean> {
    const users = await this.queryLocalIndex1(userDto.email, 1);
    return users.length > 0;
  }
  async save(userDto: CreateUserDto): Promise<User> {
    const user = User.fromDto(userDto);
    user.generateId();
    const userDbSchema = user.toDynamoDB();
    await this.dynamoDbClient.client.send(
      new PutItemCommand({
        TableName: this.dynamoDbClient.tableName,
        Item: marshall(userDbSchema),
      })
    );
    return user;
  }

  async findByID(id: string): Promise<User> {
    const userData = await this.dynamoDbClient.client.send(
      new GetItemCommand({
        TableName: this.dynamoDbClient.tableName,
        Key: marshall({
          pk: '#USER',
          sk: `#ID#${id}`,
        }),
      })
    );
    if (!userData.Item) {
      return null;
    }
    return User.fromDynamoDB(unmarshall(userData.Item));
  }

  async queryLocalIndex1(email: string, limit: number): Promise<User[]> {
    const userData = await this.dynamoDbClient.client.send(
      new QueryCommand({
        TableName: this.dynamoDbClient.tableName,
        IndexName: 'LocalId1Index',
        KeyConditionExpression: 'pk = :pk and localId1 = :localId1',
        ExpressionAttributeValues: marshall({
          ':pk': '#USER',
          ':localId1': `#EMAIL#${email}`,
        }),
        Limit: limit,
      })
    );
    if (!userData.Items || !userData.Items.length) {
      return [];
    }
    return userData.Items.map(i => User.fromDynamoDB(unmarshall(i)));
  }
}
