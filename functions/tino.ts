import { APIGatewayProxyEventV2 } from 'aws-lambda';

export const handler = async (_req: APIGatewayProxyEventV2) => {
  // comment this line in to test the automatic rollbacks of deployments
  // throw new Error();
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Tino!' }),
  };
};
