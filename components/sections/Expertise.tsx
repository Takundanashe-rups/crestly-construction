import React from 'react';

// Expertise data
const EXPERTISE_CARDS = [
  {
    title: 'Project Consultancy',
    description:
      'We offer comprehensive project consultancy services, guiding you from initial concept to project completion. Our experts ensure effective planning, risk management, and cost control for successful delivery.',
    image: '/images/consultancy.png',
    cta: 'Book Today',
    ctaHref: '/contact',
  },
  {
    title: 'Welding',
    description:
      'Our welding team delivers precision and strength for all your structural and fabrication needs. We use industry-leading techniques and equipment to guarantee safety and durability.',
    image: '/images/wielding.webp',
    cta: 'Read More',
    ctaHref: '/services/welding',
  },
  {
    title: 'Boiler Making',
    description:
      'Our boiler making specialists provide fabrication, installation, and repair of boilers and pressure vessels, ensuring compliance with industry standards and safety regulations.',
    image: '/images/bioler-making.jpg', 
    cta: 'Explore Boiler Making',
    ctaHref: '/services/boiler-making',
  },
  {
    title: 'Construction Services',
    description:
      'From residential to commercial projects, our construction services cover every phase with quality workmanship and timely delivery. We build solutions that last.',
    image: '/images/construction-services.webp', 
    cta: 'See Our Work',
    ctaHref: '/services/construction',
  },
];

const Expertise: React.FC = () => {
  return (
    <section className="w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-gray-900">
          Our Expertise
        </h2>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-10 text-base md:text-lg">
          As a locally owned and operated major construction contractor in Zimbabwe, we are dedicated to the construction growth and economic development of our country.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {EXPERTISE_CARDS.map((card, idx) => (
            <div
              key={card.title}
              className="card-wrapper bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Left Image as background */}
                <div
                  className="image-section w-full md:w-1/2 h-48 md:h-64 lg:h-auto bg-cover bg-center"
                  style={{ backgroundImage: `url(${card.image})` }}
                ></div>

                {/* Right Content */}
                <div className="content-section w-full md:w-1/2 flex items-center">
                  <div className="p-4 md:p-6">
                    <h4 className="text-xl font-bold mb-2 text-gray-900">
                      {card.title}
                    </h4>
                    <p className="text-gray-700 mb-4">{card.description}</p>
                    <a
                      href={card.ctaHref}
                      className="inline-flex items-center text-red-600 font-semibold hover:underline group"
                    >
                      {card.cta}
                      <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Expertise;
