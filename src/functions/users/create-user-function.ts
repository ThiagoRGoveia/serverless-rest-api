import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { createUserFactory } from '../../factories/users/create-user.factory';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dtos/create-user.dto';

export const handler: APIGatewayProxyHandlerV2 = async event => {
  try {
    const dto = plainToInstance(CreateUserDto, JSON.parse(event.body as string));
    await dto.validate();
    const response = await createUserFactory().execute(dto);
    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(response.body),
    };
  } catch (error: any) {
    return {
      statusCode: error?.statusCode || 500,
      headers: { 'Content-Type': 'application/json' },
      body: error?.message || 'Internal server error',
    };
  }
};
