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
    const testingApi = new sst.aws.Function('testing-api', {
      handler: 'functions/testing.handler',
      url: true,
    });

     const tinoApi = new sst.aws.Function('tino-api', {
      handler: 'functions/tino.handler',
      url: true,
    });

    const cwAlarm = new aws.cloudwatch.MetricAlarm('testing-api-error-alarm', {
      name: 'testing-api-error-alarm',
      comparisonOperator: 'GreaterThanOrEqualToThreshold',
      evaluationPeriods: 1,
      metricName: 'Errors',
      namespace: 'AWS/Lambda',
      period: 60,
      statistic: 'Sum',
      threshold: 1,
      datapointsToAlarm: 1,
      treatMissingData: 'notBreaching',
      dimensions: { FunctionName: testingApi.name },
    });

     const cwAlarmTino = new aws.cloudwatch.MetricAlarm('tino-api-error-alarm', {
      name: 'tino-api-error-alarm',
      comparisonOperator: 'GreaterThanOrEqualToThreshold',
      evaluationPeriods: 1,
      metricName: 'Errors',
      namespace: 'AWS/Lambda',
      period: 60,
      statistic: 'Sum',
      threshold: 1,
      datapointsToAlarm: 1,
      treatMissingData: 'notBreaching',
      dimensions: { FunctionName: tinoApi.name },
    });


    const cwPolicy = new aws.iam.Policy('cloudwatch-policy', {
      policy: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: ['cloudwatch:DescribeAlarms', 'cloudwatch:GetMetricData'],
            Resource: '*',
          },
        ],
      },
    });
    const cwRole = new aws.iam.Role('cloudwatch-role', {
      assumeRolePolicy: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              Service: 'lambda.amazonaws.com',
            },
            Action: 'sts:AssumeRole',
          },
        ],
      },
      inlinePolicies: [cwPolicy],
    });

    const appConfig = new aws.appconfig.Application('appconfig', {
      name: `${$app.stage}-awsfundamentals`,
      description: 'AppConfig Application',
    });

    const appConfigEnv = new aws.appconfig.Environment('appconfig-env', {
      name: 'appconfig-env',
      description: 'AppConfig Environment',
      applicationId: appConfig.id,
      monitors: [
        {
          alarmRoleArn: cwRole.arn,
          alarmArn: cwAlarm.arn,
        },
         {
          alarmRoleArn: cwRole.arn,
          alarmArn: cwAlarmTino.arn,
        },
      ],
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
          modal: {
            name: 'modal',
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
          modal: {
            enabled: true,
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
        NEXT_PUBLIC_TESTING_API_URL: testingApi.url,
         NEXT_PUBLIC_TINO_API_URL: tinoApi.url
      },
    });
  },
});
