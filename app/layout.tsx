import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import Script from 'next/script';
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
  icons: {
    icon: '/favicon.png',
  },
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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://aiessentials.us/#organization",
    "name": "AIessentials",
    "alternateName": "AI Essentials",
    "url": "https://aiessentials.us",
    "logo": {
      "@type": "ImageObject",
      "url": "https://aiessentials.us/favicon.png",
      "width": 512,
      "height": 512
    },
    "description": "AI automation consulting firm helping small and medium businesses automate operations, save 20+ hours per week, and grow without hiring.",
    "foundingDate": "2025",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "30 N Gould St Ste N",
      "addressLocality": "Sheridan",
      "addressRegion": "WY",
      "postalCode": "82801",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-213-397-1263",
      "contactType": "sales",
      "email": "info@aiessentials.us",
      "availableLanguage": "English"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "knowsAbout": ["AI Automation", "Business Process Automation", "Lead Generation Systems", "CRM Integration"]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AIessentials",
    "url": "https://aiessentials.us",
    "description": "We design, deploy, and maintain automated AI systems that grow pipeline and remove busywork.",
    "publisher": {
      "@id": "https://aiessentials.us/#organization"
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZLS0GFYVCX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZLS0GFYVCX');
          `}
        </Script>
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "v71foh0fc5");
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
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