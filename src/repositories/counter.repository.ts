import { GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { DynamoDBClient } from '../clients/dynamo-db.client';

export class CounterRepository {
  constructor(private readonly dynamoDbClient: DynamoDBClient) {}

  async increment(key: string): Promise<number> {
    const counter = await this.get(key);
    const updatedCounter = counter + 1;
    await this.dynamoDbClient.client.send(
      new PutItemCommand({
        TableName: this.dynamoDbClient.tableName,
        Item: marshall({
          pk: `#COUNTERS`,
          sk: `#COUNTER_${key}`,
          value: updatedCounter,
        }),
      })
    );
    return updatedCounter;
  }

  async get(key: string): Promise<number> {
    const counterData = await this.dynamoDbClient.client.send(
      new GetItemCommand({
        TableName: this.dynamoDbClient.tableName,
        Key: marshall({
          pk: `#COUNTERS`,
          sk: `#COUNTER_${key}`,
        }),
      })
    );
    if (!counterData.Item) {
      return 0;
    }
    return unmarshall(counterData.Item).value;
  }
}
