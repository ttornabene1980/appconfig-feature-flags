import {
  AppConfigDataClient,
  GetLatestConfigurationCommand,
  StartConfigurationSessionCommand,
} from '@aws-sdk/client-appconfigdata';
import { APIGatewayProxyEventV2 } from 'aws-lambda';

const awsRegion = process.env.AWS_REGION;

const isLocal = process.env.IS_LOCAL === 'true';

interface FeatureFlag {
  showModal: boolean;
  modalContents: {
    title: string;
    text: string;
  };
}

const appConfigClient = new AppConfigDataClient({ region: 'eu-west-1' });

const ApplicationIdentifier = process.env.APPCONFIG_APPLICATION_ID;
const EnvironmentIdentifier = process.env.APPCONFIG_ENVIRONMENT_ID;
const ConfigurationProfileIdentifier = process.env.APPCONFIG_CONFIGURATION_PROFILE_ID;

const ApplicationName = process.env.APPCONFIG_APPLICATION_NAME;
const EnvironmentName = process.env.APPCONFIG_ENVIRONMENT_NAME;
const ConfigurationProfileName = process.env.APPCONFIG_CONFIGURATION_PROFILE_NAME;

/**
 * When we're using SST in our local environment, the actual invocation of the Lambda function
 * is streamed to our local machine. Here, we don't have the AWS AppConfig Agent running, so we
 * need to fetch the configuration data from AppConfig directly.
 */
async function getFeatureFlagLocally(): Promise<FeatureFlag | undefined> {
  // Start a configuration session
  const startSessionCommand = new StartConfigurationSessionCommand({
    ApplicationIdentifier,
    EnvironmentIdentifier,
    ConfigurationProfileIdentifier,
  });

  const sessionResponse = await appConfigClient.send(startSessionCommand);
  const { InitialConfigurationToken } = sessionResponse;

  if (!InitialConfigurationToken) {
    throw new Error('Failed to start configuration session.');
  }

  // Get the latest configuration
  const getConfigCommand = new GetLatestConfigurationCommand({
    ConfigurationToken: InitialConfigurationToken,
  });

  const configResponse = await appConfigClient.send(getConfigCommand);
  const configurationData = configResponse.Configuration;

  if (configurationData) {
    const featureFlagConfiguration: FeatureFlag = JSON.parse(
      new TextDecoder('utf-8').decode(configurationData),
    );
    return featureFlagConfiguration;
  } else {
    console.log('No configuration data received.');
  }
}

/**
 * When we're running in AWS Lambda, we can use the AWS AppConfig Extension to fetch the configuration
 * data from the local agent.
 */
async function getFeatureFlagLive(): Promise<FeatureFlag | undefined> {
  const baseUrl = `http://localhost:2772`;
  const appPath = `applications/${ApplicationName}`;
  const envPath = `environments/${EnvironmentName}`;
  const configPath = `configurations/${ConfigurationProfileName}`;
  const extensionUrl = `${baseUrl}/${appPath}/${envPath}/${configPath}`;
  console.info(`Fetching feature flag configuration from: ${extensionUrl}`);
  const response = await fetch(extensionUrl).catch((e) => {
    console.error('Error fetching feature flag configuration:', e);
  });
  const data = (await response?.json()) as FeatureFlag;
  return data;
}
 
const getFeatureFlag = () => (isLocal ? getFeatureFlagLocally() : getFeatureFlagLive());

export const handler = async (_req: APIGatewayProxyEventV2) => {
  const featureFlag = await getFeatureFlag();
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      featureFlag,
      awsRegion,
      ApplicationIdentifier,
      EnvironmentIdentifier,
      ConfigurationProfileIdentifier,
    }),
  };
};
