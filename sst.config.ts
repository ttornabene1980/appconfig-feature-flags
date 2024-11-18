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
      name: 'awsfundamentals',
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
    });

    const api = new sst.aws.Function('api', {
      handler: 'functions/api.handler',
      url: true,
      environment: {
        APPCONFIG_APPLICATION_ID: appConfig.id,
        APPCONFIG_ENVIRONMENT_ID: appConfigEnv.id,
        APPCONFIG_CONFIGURATION_PROFILE_ID: appConfigProfile.id,
      },
      permissions: [{ actions: ['appconfig:*'], resources: ['*'] }],
    });

    new sst.aws.Nextjs('appconfig-ff', {
      environment: {
        NEXT_PUBLIC_API_URL: api.url,
      },
    });
  },
});
