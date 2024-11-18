import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Feature Flags with AppConfig',
  description: 'by AWS Fundamentals',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
