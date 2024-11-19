'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const getAppConfigUrl = (config: ConfigurationResponse) =>
  `https://${config.awsRegion}.console.aws.amazon.com/systems-manager/appconfig/applications/${config.ApplicationIdentifier}/environments/${config.EnvironmentIdentifier}/?region=${config.awsRegion}`;

interface ConfigurationResponse {
  featureFlag: FeatureFlag;
  awsRegion: string;
  ApplicationIdentifier: string;
  EnvironmentIdentifier: string;
}

interface FeatureFlag {
  showModal: boolean;
  modalContents: {
    title: string;
    text: string;
  };
}

export default function Home() {
  const [configuration, setConfiguration] = useState<ConfigurationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image src="/logo.png" alt="AppConfig Logo" width={100} height={100} />
      <h1 className="text-4xl font-bold mb-4">AWS AppConfig Feature Flags</h1>
      {isLoading ? (
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      ) : (
        <>
          {configuration?.featureFlag?.showModal && (
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                {configuration.featureFlag?.modalContents.title}
              </h2>
              <p>{configuration.featureFlag?.modalContents.text}</p>
            </div>
          )}
          {!configuration?.featureFlag?.showModal && <p>Feature Flag is disabled</p>}
        </>
      )}
      {configuration && (
        <a
          href={getAppConfigUrl(configuration)}
          target="_blank"
          className="mt-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          rel="noopener noreferrer"
        >
          Manage AWS AppConfig
        </a>
      )}
    </div>
  );
}
