'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface FeatureFlag {
  showModal: boolean;
  modalContents: {
    title: string;
    text: string;
  };
}

export default function Home() {
  const [featureFlag, setFeatureFlag] = useState<FeatureFlag | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL!);
        const data = await response.json();
        setFeatureFlag(data.featureFlag);
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
          {featureFlag?.showModal && (
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">{featureFlag.modalContents.title}</h2>
              <p>{featureFlag.modalContents.text}</p>
            </div>
          )}
          {!featureFlag?.showModal && <p>Feature Flag is disabled</p>}
        </>
      )}
    </div>
  );
}
