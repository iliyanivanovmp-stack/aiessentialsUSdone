import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '24/7 Pipeline Engine - AI-Powered Lead Generation | AIessentials',
  description: 'A CRM-integrated outbound system that generates 5+ qualified meetings per month without hiring SDRs or doing daily manual outreach. Hands-off pipeline automation.',
  openGraph: {
    title: '24/7 Pipeline Engine - AI-Powered Lead Generation | AIessentials',
    description: 'A CRM-integrated outbound system that generates 5+ qualified meetings per month without hiring SDRs or doing daily manual outreach.',
    type: 'website',
    url: 'https://aiessentials.us/24-7-pipeline-engine',
  },
};

export default function PipelineEngineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://aiessentials.us/24-7-pipeline-engine/#service",
    "name": "24/7 Pipeline Engine",
    "description": "A CRM-integrated outbound system that generates a minimum of 5 qualified meetings per month without hiring SDRs, relying on referrals, or doing daily manual outreach.",
    "provider": {
      "@id": "https://aiessentials.us/#organization"
    },
    "serviceType": "AI-Powered Lead Generation",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "url": "https://aiessentials.us/24-7-pipeline-engine",
    "offers": [
      {
        "@type": "Offer",
        "name": "Hands-Off Pipeline Engine",
        "description": "Full hands-off system - you only attend booked meetings. Includes campaign launch, inbox management, qualification, scheduling, and weekly optimization.",
        "price": "2500",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "2500",
          "priceCurrency": "USD",
          "unitText": "setup fee"
        }
      },
      {
        "@type": "Offer",
        "name": "Build + Handoff Engine",
        "description": "System build and launch with handoff to your team. Includes system build, reply playbook, sequences, and CRM integration.",
        "price": "1500",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "1500",
          "priceCurrency": "USD",
          "unitText": "one-time"
        }
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Pipeline Engine Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Included Features",
          "itemListElement": [
            "ICP targeting and mapping",
            "Lead list building and enrichment",
            "Cold email copy and sequences",
            "Inbox and tracking setup",
            "CRM integration",
            "Booking flow automation"
          ]
        }
      ]
    }
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "24/7 Pipeline Engine - AI-Powered Lead Generation",
    "description": "A CRM-integrated outbound system that generates 5+ qualified meetings per month without hiring SDRs or doing daily manual outreach.",
    "url": "https://aiessentials.us/24-7-pipeline-engine",
    "isPartOf": {
      "@type": "WebSite",
      "url": "https://aiessentials.us"
    },
    "about": {
      "@id": "https://aiessentials.us/24-7-pipeline-engine/#service"
    },
    "mainEntity": {
      "@id": "https://aiessentials.us/24-7-pipeline-engine/#service"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      {children}
    </>
  );
}
