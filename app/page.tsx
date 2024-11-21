'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const appConfigDeployments = (config: ConfigurationResponse) =>
  `https://${config.awsRegion}.console.aws.amazon.com/systems-manager/appconfig/applications/${config.ApplicationIdentifier}/environments/${config.EnvironmentIdentifier}/?region=${config.awsRegion}`;

const appConfigFeatureFlags = (config: ConfigurationResponse) =>
  `https://${config.awsRegion}.console.aws.amazon.com/systems-manager/appconfig/applications/${config.ApplicationIdentifier}/featureflags/${config.ConfigurationProfileIdentifier}/versions?region=${config.awsRegion}`;

interface ConfigurationResponse {
  featureFlag: FeatureFlag;
  awsRegion: string;
  ApplicationIdentifier: string;
  EnvironmentIdentifier: string;
  ConfigurationProfileIdentifier: string;
}

interface FeatureFlag {
  modal: {
    enabled: boolean;
    title: string;
    text: string;
  };
}

export default function Home() {
  const [configuration, setConfiguration] = useState<ConfigurationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL!);
        const data = await response.json();
        setConfiguration(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();

    const id = setInterval(fetchData, 3000);
    setIntervalId(id);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      <div className="mt-32 relative w-32 h-32 rounded-full overflow-hidden">
        <Image
          src="/logo.png"
          alt="AppConfig Logo"
          width={100}
          height={100}
          className="object-cover w-full h-full transition-all duration-500 ease-in-out transform hover:scale-110"
        />
      </div>
      <h1 className="text-4xl font-bold my-8 text-[#C71D60]">AWS AppConfig Feature Flags</h1>
      <p className="text-gray-600 mb-8">
        This is an example application to learn about AppConfig feature flags.
      </p>
      {configuration && (
        <div className="mt-8 mb-8">
          <a
            href={appConfigDeployments(configuration)}
            target="_blank"
            className="mt-16 mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            rel="noopener noreferrer"
          >
            Show Deployments 🚀
          </a>
          <a
            href={appConfigFeatureFlags(configuration)}
            target="_blank"
            className="mt-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            rel="noopener noreferrer"
          >
            Update Feature Flags 🚩
          </a>
        </div>
      )}
      {isLoading ? (
        <div className="animate-spin rounded-full mt-16 h-32 w-32 border-b-2 border-gray-900"></div>
      ) : (
        <>
          {configuration?.featureFlag?.modal?.enabled && (
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">{configuration.featureFlag?.modal.title}</h2>
              <p>{configuration.featureFlag?.modal.text}</p>
            </div>
          )}
          {!configuration?.featureFlag?.modal?.enabled && (
            <p className="text-gray-600">Feature Flag is disabled 😊</p>
          )}
        </>
      )}
    </div>
  );
}
