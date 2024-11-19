import {
  AppConfigDataClient,
  GetLatestConfigurationCommand,
  StartConfigurationSessionCommand,
} from '@aws-sdk/client-appconfigdata';
import { APIGatewayProxyEventV2 } from 'aws-lambda';

interface FeatureFlag {
  showModal: boolean;
  modalContents: {
    title: string;
    text: string;
  };
}

const ApplicationIdentifier = process.env.APPCONFIG_APPLICATION_ID;
const EnvironmentIdentifier = process.env.APPCONFIG_ENVIRONMENT_ID;
const ConfigurationProfileIdentifier = process.env.APPCONFIG_CONFIGURATION_PROFILE_ID;

const appConfigClient = new AppConfigDataClient({ region: 'eu-west-1' });

async function getFeatureFlagConfiguration(): Promise<FeatureFlag | undefined> {
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

export const handler = async (req: APIGatewayProxyEventV2) => {
  const featureFlag = await getFeatureFlagConfiguration();
  return {
    statusCode: 200,
    body: JSON.stringify({ featureFlag }),
  };
};
