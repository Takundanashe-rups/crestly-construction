import Link from 'next/link';
import MissionSection from './MissionSection';
import AnimatedHeader from './AnimatedHeader';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-900">
      <AnimatedHeader />

      {/* Our Story Section */}
      <section className="relative bg-gray-50 py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Story Card */}
          <article
            className="bg-blue-900 text-white p-8 md:p-10 rounded-lg shadow-xl"
          >
            <h2 className="text-3xl font-bold mb-4 text-yellow-300">Our Story</h2>
            <p className="mb-4 text-base leading-relaxed text-blue-100">
              In the early 2010s, Zimbabwe's construction sector was thriving — yet lacked reliable,
              skilled execution. Crestly Construction was founded to change that.
            </p>
            <p className="mb-4 text-base leading-relaxed text-blue-100">
              From a small workshop driven by passion, we’ve grown into a national brand known for
              civil precision, industrial standards, and integrity-driven operations.
            </p>
            <p className="text-base leading-relaxed text-blue-100">
              Today, we’ve delivered over <strong className="text-white">100+ successful projects</strong>
              — from steel fabrication to boiler installations — always rooted in trust, safety, and community.
            </p>
          </article>

          {/* Image Block */}
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
  <Image
    src="/images/overlay.jpg"
    alt="Crestly Construction team at work on a project site in Zimbabwe"
    fill
    priority
    className="rounded-lg object-cover w-full h-full shadow-md"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
  />
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <MissionSection />
    </main>
  );
}
