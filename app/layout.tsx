import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { SpotlightCursor } from '@/components/ui/spotlight-cursor';
import { GridCursor } from '@/components/ui/grid-cursor';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AIessentials — AI Automation & Consulting',
  description: 'We design, deploy, and maintain automated AI systems that grow pipeline and remove busywork.',
  openGraph: {
    title: 'AIessentials — AI Automation & Consulting',
    description: 'We design, deploy, and maintain automated AI systems that grow pipeline and remove busywork.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <GridCursor />
        <SpotlightCursor
          config={{
            radius: 100,
            brightness: 0.15,
            color: '#ffffff',
            smoothing: 0.1,
          }}
        />
        {children}
      </body>
    </html>
  );
}