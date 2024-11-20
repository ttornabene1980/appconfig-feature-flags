/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'appconfig-feature-flags',
      removal: 'remove',
      home: 'aws',
    };
  },
  async run() {
    const appConfig = new aws.appconfig.Application('appconfig', {
      name: `${$app.stage}-awsfundamentals`,
      description: 'AppConfig Application',
    });

    const appConfigEnv = new aws.appconfig.Environment('appconfig-env', {
      name: 'appconfig-env',
      description: 'AppConfig Environment',
      applicationId: appConfig.id,
    });

    const appConfigProfile = new aws.appconfig.ConfigurationProfile('appconfig-profile', {
      applicationId: appConfig.id,
      description: 'AppConfig Configuration Profile',
      name: 'appconfig-profile',
      locationUri: 'hosted',
      type: 'AWS.AppConfig.FeatureFlags',
    });

    new aws.appconfig.HostedConfigurationVersion('appconfig-flag', {
      applicationId: appConfig.id,
      configurationProfileId: appConfigProfile.configurationProfileId,
      description: 'Feature Flag Configuration',
      contentType: 'application/json',
      content: JSON.stringify({
        flags: {
          showModal: {
            name: 'showModal',
            _deprecation: {
              status: 'planned',
            },
          },
          modalContents: {
            name: 'modalContents',
            attributes: {
              title: {
                constraints: {
                  type: 'string',
                  required: true,
                },
              },
              text: {
                constraints: {
                  type: 'string',
                  required: true,
                },
              },
            },
          },
        },
        values: {
          showModal: {
            enabled: 'true',
          },
          modalContents: {
            enabled: 'true',
            title: 'This is a nice title! 🎉',
            text: 'This is the text for the modal. 🚀',
          },
        },
        version: '1',
      }),
    });

    new aws.appconfig.DeploymentStrategy('appconfig-deployment-strategy', {
      name: 'appconfig-deployment-strategy',
      description: 'Deployment Strategy',
      deploymentDurationInMinutes: 0,
      finalBakeTimeInMinutes: 1,
      growthFactor: 100,
      growthType: 'LINEAR',
      replicateTo: 'NONE',
    });

    const api = new sst.aws.Function('api', {
      handler: 'functions/api.handler',
      url: true,
      environment: {
        IS_LOCAL: `${$dev}`,
        APPCONFIG_APPLICATION_ID: appConfig.id,
        APPCONFIG_ENVIRONMENT_ID: appConfigEnv.environmentId,
        APPCONFIG_CONFIGURATION_PROFILE_ID: appConfigProfile.configurationProfileId,
        APPCONFIG_APPLICATION_NAME: appConfig.name,
        APPCONFIG_ENVIRONMENT_NAME: appConfigEnv.name,
        APPCONFIG_CONFIGURATION_PROFILE_NAME: appConfigProfile.name,
      },
      permissions: [{ actions: ['appconfig:*'], resources: ['*'] }],
      layers: ['arn:aws:lambda:eu-west-1:434848589818:layer:AWS-AppConfig-Extension:159'],
    });

    new sst.aws.Nextjs('appconfig-ff', {
      environment: {
        NEXT_PUBLIC_API_URL: api.url,
      },
    });
  },
});
