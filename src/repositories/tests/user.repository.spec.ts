import { GetItemCommand, PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBClient as DynamoDBClientLib } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { DynamoDBClient } from '../../clients/dynamo-db.client';
import { CreateUserDto } from '../../functions/users/dtos/create-user.dto';
import { User } from '../../models/user.model';
import { UserRepository } from '../../repositories/user.repository';
import * as uuid from 'uuid';

jest.mock('@aws-sdk/client-dynamodb');
jest.mock('../../clients/dynamo-db.client');
jest.mock('uuid');

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let dynamoDbClient: DynamoDBClient;

  beforeEach(() => {
    dynamoDbClient = new DynamoDBClient('mock-table-name');
    dynamoDbClient.client = { send: jest.fn() } as unknown as DynamoDBClientLib;
    userRepository = new UserRepository(dynamoDbClient);
  });

  describe('exists', () => {
    it('should return true if user exists', async () => {
      const userDto = new CreateUserDto();
      userDto.email = 'test@example.com';
      userDto.name = 'Test User';

      (dynamoDbClient.client.send as jest.Mock).mockResolvedValue({
        Items: [{}],
      });

      const exists = await userRepository.exists(userDto);

      expect(dynamoDbClient.client.send).toHaveBeenCalledWith(expect.any(QueryCommand));
      expect(exists).toBe(true);
    });
  });

  describe('save', () => {
    it('should save a user', async () => {
      const userDto = new CreateUserDto();
      userDto.email = 'test@example.com';
      userDto.name = 'Test User';
      uuid.v4 = jest.fn().mockReturnValue('1234');

      (dynamoDbClient.client.send as jest.Mock).mockResolvedValue({});

      const user = await userRepository.save(userDto);

      expect(dynamoDbClient.client.send).toHaveBeenCalledWith(expect.any(PutItemCommand));
      expect(user).toBeInstanceOf(User);
    });
  });

  describe('findByID', () => {
    it('should return a user if it exists', async () => {
      const id = '1234';
      const mockUser = {
        id,
        email: 'test@example.com',
        name: 'Test User',
        pk: '#USER',
        sk: `#ID#${id}`,
        localId1: `#EMAIL#test@example`,
      };
      (dynamoDbClient.client.send as jest.Mock).mockResolvedValue({
        Item: marshall(mockUser),
      });

      const user = await userRepository.findByID(id);

      expect(dynamoDbClient.client.send).toHaveBeenCalledWith(expect.any(GetItemCommand));
      expect(user).toBeInstanceOf(User);
    });
  });

  describe('queryLocalIndex1', () => {
    it('should return a list of users', async () => {
      const email = 'test@example.com';
      const limit = 1;
      const mockUser = {
        id: '1234',
        email: 'test@example.com',
        name: 'Test User',
        pk: '#USER',
        sk: `#ID#$1234`,
        localId1: `#EMAIL#test@example`,
      };
      (dynamoDbClient.client.send as jest.Mock).mockResolvedValue({
        Items: [marshall(mockUser)],
      });

      const users = await userRepository.queryLocalIndex1(email, limit);

      expect(dynamoDbClient.client.send).toHaveBeenCalledWith(expect.any(QueryCommand));
      expect(users).toBeInstanceOf(Array);
      expect(users[0]).toBeInstanceOf(User);
    });
  });
});
