import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { getVisitsFactory } from '../../factories/visits/get-visits.factory';

export const handler: APIGatewayProxyHandlerV2 = async event => {
  try {
    const response = await getVisitsFactory().execute();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visits: response,
      }),
    };
  } catch (error: any) {
    return {
      statusCode: error?.statusCode || 500,
      body: error?.message || 'Internal server error',
    };
  }
};
