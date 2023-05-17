import { DynamoDBClient } from '../dynamo-db.client';
import { DynamoDBClient as DynamoDBClientLib } from '@aws-sdk/client-dynamodb';

jest.mock('@aws-sdk/client-dynamodb', () => {
  return {
    DynamoDBClient: jest.fn().mockImplementation(() => {
      return {};
    }),
  };
});

describe('DynamoDBClient', () => {
  it('should correctly initialize properties', () => {
    const tableName = 'testTable';
    const client = new DynamoDBClient(tableName);

    expect(client.tableName).toBe(tableName);
    expect(client.marshallOptions).toEqual({
      removeUndefinedValues: true,
    });
    expect(client.unmarshallOptions).toEqual({
      wrapNumbers: true,
    });
  });
});
