import React from "react";
import Link from "next/link";

const WhyWorkWithUs = () => {
  return (
    <section className="w-full bg-white py-10 px-2 md:px-0">
      <div className="container mx-auto rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row items-stretch bg-white relative min-h-[500px] md:min-h-[600px]">
        {/* Left: Image */}
        <div className="md:w-1/2 w-full relative flex items-center justify-center min-h-[160px] md:min-h-[600px] bg-gray-100">
          <img
            src="/images/work-with-us-header-2.jpg"
            alt="Why work with Crestly Constructions"
            className="w-full h-full object-cover object-center md:rounded-none rounded-t-3xl md:rounded-l-3xl md:rounded-r-none"
            loading="lazy"
          />
        </div>
        
        {/* Right: Text Content */}
        <div className="md:w-1/2 w-full flex flex-col justify-center px-8 py-10 md:py-0 relative min-h-[320px] md:min-h-[600px]">
          <span className="text-[#A5852A] font-semibold tracking-widest text-sm mb-2">EST. 2022</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">
            Solving Housing Challenges<br />With Lasting Impact
          </h2>
          <p className="text-gray-700 mb-8 text-base md:text-lg max-w-xl">
            We offer a wide spectrum of construction services with special focus on housing development, highways and roads infrastructure construction, commercial and industrial property development, earthmoving services, buildings construction, and project management.
          </p>
          
          {/* Smaller Button */}
          <Link
            href="/about"
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 transition-colors text-white font-medium py-2 px-4 xs:py-2.5 xs:px-5 sm:py-3 sm:px-6 rounded-md shadow-lg text-sm xs:text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
          >
            <span className="flex items-center">
              Discover More
              <svg className="ml-1" width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 13L11 9L7 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>
          
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithUs;