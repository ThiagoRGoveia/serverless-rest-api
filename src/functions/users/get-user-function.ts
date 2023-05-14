import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { getUserFactory } from '../../factories/get-user.factory';

export const handler: APIGatewayProxyHandlerV2 = async event => {
  try {
    const email: string = event.pathParameters.email.replace("'", '');
    const response = await getUserFactory().execute(email);
    return {
      statusCode: 200,
      body: JSON.stringify(response.body),
    };
  } catch (error: any) {
    return {
      statusCode: error?.statusCode || 500,
      body: error?.message || 'Internal server error',
    };
  }
};
