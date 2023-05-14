import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { createUserFactory } from '../../factories/create-user.factory';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dtos/create-user.dto';

export const handler: APIGatewayProxyHandlerV2 = async event => {
  try {
    const response = await createUserFactory().execute(
      plainToInstance(CreateUserDto, JSON.parse(event.body as string))
    );
    return {
      statusCode: 201,
      body: JSON.stringify(response.body),
    };
  } catch (error: any) {
    return {
      statusCode: error?.statusCode || 500,
      body: error?.message || 'Internal server error',
    };
  }
};
