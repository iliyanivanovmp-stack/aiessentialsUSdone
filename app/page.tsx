import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PASBlock from '@/components/PASBlock';
import CoreOffer from '@/components/CoreOffer';
import Services from '@/components/Services';
import Process from '@/components/Process';
import ROICalculator from '@/components/ROICalculator';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://aiessentials.us/#webpage",
  "url": "https://aiessentials.us/",
  "name": "AIessentials — AI Automation & Consulting",
  "description": "We design, deploy, and maintain automated AI systems that grow pipeline and remove busywork.",
  "inLanguage": "en-US",
  "isPartOf": { "@id": "https://aiessentials.us/#website" },
  "about": { "@id": "https://aiessentials.us/#service" },
  "publisher": { "@id": "https://aiessentials.us/#organization" }
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://aiessentials.us/#service",
  "name": "AI Essentials",
  "legalName": "IvanovIV LLC",
  "url": "https://aiessentials.us/",
  "description": "AI automation consulting for B2B businesses. We build custom AI automation systems in 14-30 days that pay for themselves within 60 days.",
  "serviceType": "AI Automation Consulting",
  "areaServed": { "@type": "Country", "name": "United States" },
  "priceRange": "$2,500 – Custom",
  "founder": {
    "@type": "Person",
    "name": "Iliyan Ivanov",
    "jobTitle": "AI Agency Founder",
    "url": "https://www.linkedin.com/in/iliyan-ivanov-50299b215/",
    "worksFor": { "@id": "https://aiessentials.us/#organization" }
  },
  "provider": { "@id": "https://aiessentials.us/#organization" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "AI Automation Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Starter",
        "description": "1 core automation, basic support, ROI review @ 30 days",
        "price": "2500",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "seller": { "@id": "https://aiessentials.us/#organization" },
        "priceSpecification": [
          { "@type": "UnitPriceSpecification", "price": "2500", "priceCurrency": "USD", "name": "Setup fee" },
          { "@type": "UnitPriceSpecification", "price": "900", "priceCurrency": "USD", "unitCode": "MON", "name": "Monthly retainer" }
        ]
      },
      {
        "@type": "Offer",
        "name": "Growth",
        "description": "3–5 automations, playbooks, priority support",
        "price": "6000",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "seller": { "@id": "https://aiessentials.us/#organization" },
        "priceSpecification": [
          { "@type": "UnitPriceSpecification", "price": "6000", "priceCurrency": "USD", "name": "Setup fee" },
          { "@type": "UnitPriceSpecification", "price": "2500", "priceCurrency": "USD", "unitCode": "MON", "name": "Monthly retainer" }
        ]
      },
      {
        "@type": "Offer",
        "name": "Scale",
        "description": "Bespoke systems, workshops, SLA, security reviews",
        "availability": "https://schema.org/InStock",
        "seller": { "@id": "https://aiessentials.us/#organization" }
      },
      {
        "@type": "Service",
        "name": "24/7 Pipeline Engine — Lead Generation Automation",
        "description": "24/7 system that identifies ICP targets, enriches, writes personalized outreach, and appoints new meetings.",
        "url": "https://aiessentials.us/24-7-pipeline-engine",
        "category": "List Building, Enrichment, 24/7 Leadflow, Sequencing, CRM Integration",
        "serviceOutput": "Typical: +25–45% reply lift.",
        "provider": { "@id": "https://aiessentials.us/#organization" }
      },
      {
        "@type": "Service",
        "name": "Free AI Revenue + Savings Plan",
        "description": "In 30 minutes, you will know the top 3 AI opportunities that will save you or make you money - plus a 1-page ROI plan.",
        "url": "https://aiessentials.us/free-ai-revenue-and-savings-plan",
        "category": "AI Opportunity Scan, Rollout Roadmap, 1-Page Plan",
        "serviceOutput": "Clear path to adopting AI in your business.",
        "provider": { "@id": "https://aiessentials.us/#organization" }
      },
      {
        "@type": "Service",
        "name": "Ops & Workflow Automation",
        "description": "Kill repetitive tasks with AI systems that never forget or make mistakes, so your team can focus on revenue-first tasks.",
        "category": "Data Sync, Reporting, Ticketing, Slack Ops, Approvals",
        "serviceOutput": "Typical: −30–60% handling time.",
        "provider": { "@id": "https://aiessentials.us/#organization" }
      }
    ]
  }
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How fast can we go live?",
      "acceptedAnswer": { "@type": "Answer", "text": "Most first automations go live in 14-30 days after discovery." }
    },
    {
      "@type": "Question",
      "name": "What tools do you use?",
      "acceptedAnswer": { "@type": "Answer", "text": "We fit into your stack (n8n/Zapier/Pipedream, Slack, HubSpot/Salesforce, GSheets/DB, OpenAI/Anthropic, etc.)." }
    },
    {
      "@type": "Question",
      "name": "Data security?",
      "acceptedAnswer": { "@type": "Answer", "text": "We follow least-privilege access, log all automations, and can work within your VPC." }
    },
    {
      "@type": "Question",
      "name": "Will you replace my team?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. We remove repetitive tasks so your team can focus on higher-value work." }
    },
    {
      "@type": "Question",
      "name": "What if ROI isn't clear?",
      "acceptedAnswer": { "@type": "Answer", "text": "We don't build it. Your ROI Map shows potential impact before any commitment." }
    },
    {
      "@type": "Question",
      "name": "Who maintains the systems?",
      "acceptedAnswer": { "@type": "Answer", "text": "We can own maintenance or train your team - choice is yours. Training your team comes at a higher cost." }
    }
  ]
};

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }} />
      <Header />
      <Hero />
      <PASBlock />
      <CoreOffer />
      <Services />
      <Process />
      <ROICalculator />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}