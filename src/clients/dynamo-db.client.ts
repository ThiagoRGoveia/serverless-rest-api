import { DynamoDBClient as DynamoDBClientLib } from '@aws-sdk/client-dynamodb';
import { marshallOptions, unmarshallOptions } from '@aws-sdk/util-dynamodb';

const config = {
  region: process.env.AWS_REGION as string,
};

export class DynamoDBClient {
  client: DynamoDBClientLib;
  tableName: string | undefined;
  marshallOptions: marshallOptions;
  unmarshallOptions: unmarshallOptions;

  constructor(tableName: string) {
    this.tableName = tableName;
    this.client = new DynamoDBClientLib({
      ...config,
      maxAttempts: 5,
    });
    this.marshallOptions = {
      removeUndefinedValues: true,
    };
    this.unmarshallOptions = {
      wrapNumbers: true,
    };
  }
}
