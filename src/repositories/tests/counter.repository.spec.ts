import { GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBClient as DynamoDBClientLib } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { DynamoDBClient } from '../../clients/dynamo-db.client';
import { CounterRepository } from '../../repositories/counter.repository';

jest.mock('@aws-sdk/client-dynamodb');
jest.mock('../../clients/dynamo-db.client');

describe('CounterRepository', () => {
  let counterRepository: CounterRepository;
  let dynamoDbClient: DynamoDBClient;

  beforeEach(() => {
    dynamoDbClient = new DynamoDBClient('test-table');
    dynamoDbClient.client = { send: jest.fn() } as unknown as DynamoDBClientLib;
    counterRepository = new CounterRepository(dynamoDbClient);
  });

  describe('increment', () => {
    it('should increment a counter', async () => {
      const key = 'test';

      (dynamoDbClient.client.send as jest.Mock).mockResolvedValueOnce({
        Item: marshall({
          value: 1,
        }),
      });

      (dynamoDbClient.client.send as jest.Mock).mockResolvedValueOnce({});

      const updatedCounter = await counterRepository.increment(key);

      expect(dynamoDbClient.client.send).toHaveBeenNthCalledWith(1, expect.any(GetItemCommand));

      expect(dynamoDbClient.client.send).toHaveBeenNthCalledWith(2, expect.any(PutItemCommand));

      expect(updatedCounter).toEqual(2);
    });
  });

  describe('get', () => {
    it('should return a counter if it exists', async () => {
      const key = 'test';

      (dynamoDbClient.client.send as jest.Mock).mockResolvedValue({
        Item: marshall({
          value: 2,
        }),
      });

      const counter = await counterRepository.get(key);

      expect(dynamoDbClient.client.send).toHaveBeenCalledWith(expect.any(GetItemCommand));

      expect(counter).toEqual(2);
    });

    it('should return zero if counter does not exist', async () => {
      const key = 'test';

      (dynamoDbClient.client.send as jest.Mock).mockResolvedValue({});

      const counter = await counterRepository.get(key);

      expect(dynamoDbClient.client.send).toHaveBeenCalledWith(expect.any(GetItemCommand));

      expect(counter).toEqual(0);
    });
  });
});
