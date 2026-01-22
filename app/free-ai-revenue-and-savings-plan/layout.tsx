import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free AI Revenue + Savings Plan | AIessentials',
  description: 'Get a custom AI Revenue + Savings Plan in 30 minutes. Discover the top 3 AI opportunities to save or make money for your business - completely free.',
  openGraph: {
    title: 'Free AI Revenue + Savings Plan | AIessentials',
    description: 'Get a custom AI Revenue + Savings Plan in 30 minutes. Discover the top 3 AI opportunities to save or make money for your business.',
    type: 'website',
    url: 'https://aiessentials.us/free-ai-revenue-and-savings-plan',
  },
};

export default function FreeAIPlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://aiessentials.us/free-ai-revenue-and-savings-plan/#service",
    "name": "Free AI Revenue + Savings Plan",
    "description": "A 30-minute consultation to identify the top 3 AI opportunities that will save or make money for your business, followed by a custom 1-page AI Revenue + Savings Plan delivered within 48 hours.",
    "provider": {
      "@id": "https://aiessentials.us/#organization"
    },
    "serviceType": "AI Consulting",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "url": "https://aiessentials.us/free-ai-revenue-and-savings-plan",
    "offers": {
      "@type": "Offer",
      "name": "Free AI Revenue + Savings Plan",
      "description": "30-minute AI opportunity scan plus custom 1-page AI Revenue + Savings Plan with detailed rollout roadmap.",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "What You Get",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "30-Min AI Opportunity Scan",
          "description": "Quick review of workflows to discover time/money leaks, top 3 AI opportunities, and select the #1 ROI first build opportunity."
        },
        {
          "@type": "Offer",
          "name": "1-Page AI Revenue + Savings Plan",
          "description": "Decision-ready plan showing recommended tools, required data/integration guide, and projected impact."
        },
        {
          "@type": "Offer",
          "name": "Detailed Rollout Roadmap",
          "description": "Step-by-step system to build your #1 ROI AI system with custom map, milestones, and timeline."
        }
      ]
    }
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Free AI Revenue + Savings Plan",
    "description": "Get a custom AI Revenue + Savings Plan in 30 minutes. Discover the top 3 AI opportunities to save or make money for your business.",
    "url": "https://aiessentials.us/free-ai-revenue-and-savings-plan",
    "isPartOf": {
      "@type": "WebSite",
      "url": "https://aiessentials.us"
    },
    "about": {
      "@id": "https://aiessentials.us/free-ai-revenue-and-savings-plan/#service"
    },
    "mainEntity": {
      "@id": "https://aiessentials.us/free-ai-revenue-and-savings-plan/#service"
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
