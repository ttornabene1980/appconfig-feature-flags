import { AppConfigClient } from '@aws-sdk/client-appconfig';
import { APIGatewayProxyEventV2 } from 'aws-lambda';

const ApplicationId = process.env.APPCONFIG_APPLICATION_ID;
const EnvironmentId = process.env.APPCONFIG_ENVIRONMENT_ID;
const ConfigurationProfileId = process.env.APPCONFIG_CONFIGURATION_PROFILE_ID;

const appConfigClient = new AppConfigClient({ region: 'eu-west-1' });

async function evaluateFeatureFlag(flagName: string) {
  console.info(`ApplicationID: ${ApplicationId}`);
  console.info(`EnvironmentID: ${EnvironmentId}`);
  console.info(`ConfigurationProfileID: ${ConfigurationProfileId}`);
}

export const handler = async (req: APIGatewayProxyEventV2) => {
  await evaluateFeatureFlag('my-feature-flag');
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from API!' }),
  };
};
