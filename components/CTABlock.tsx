'use client';

interface CTABlockProps {
  headline: string;
  description: string;
  buttonText?: string;
  buttonUrl?: string;
}

export default function CTABlock({
  headline,
  description,
  buttonText = "Book Free Strategy Call",
  buttonUrl = "https://calendly.com/iliyan-ivanov-mp/discovery-call-with-aiessentials"
}: CTABlockProps) {
  return (
    <div className="my-8 pl-6 border-l-4 border-cyan-400 bg-cyan-950/20 py-6 pr-6 rounded-r-lg">
      <p className="text-lg font-semibold text-white mb-2">
        {headline}
      </p>
      <p className="text-gray-300 mb-4">
        {description}
      </p>
      <a
        href={buttonUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-cyan-400 text-black px-6 py-2 font-semibold text-sm hover:bg-cyan-300 transition-colors duration-200 rounded"
      >
        {buttonText}
      </a>
    </div>
  );
}
