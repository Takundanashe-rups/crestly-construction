import Link from 'next/link';
import React from 'react';

interface CallToActionProps {
  heading?: string;
  description?: string;
  primaryLinkHref?: string;
  primaryLinkText?: string;
  secondaryLinkHref?: string;
  secondaryLinkText?: string;
  className?: string;
}

const CallToAction: React.FC<CallToActionProps> = ({
  heading = 'Ready to Start Your Next Project?',
  description = `Let's discuss how Crestly Construction can bring your vision to life with our expertise and commitment to excellence.`,
  primaryLinkHref = '/contact',
  primaryLinkText = 'Get Free Quote',
  secondaryLinkHref = '/projects',
  secondaryLinkText = 'View Our Projects',
  className = '',
}) => (
  <section className={`py-16 px-6 md:px-16 ${className}`}>
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        {heading}
      </h2>
      <p className="text-gray-700 mb-8 text-lg">
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          href={primaryLinkHref} 
          className="w-full sm:w-auto bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-all duration-200 transform hover:bg-yellow-600 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2"
        >
          {primaryLinkText}
        </Link>
        <Link 
          href={secondaryLinkHref} 
          className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 bg-white/80 px-8 py-3 rounded-lg font-semibold shadow-sm transition-all duration-200 transform hover:bg-gray-100 hover:border-yellow-500 hover:text-yellow-600 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2"
        >
          {secondaryLinkText}
        </Link>
      </div>
    </div>
  </section>
);

export default CallToAction; 