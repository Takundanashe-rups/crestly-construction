import Link from 'next/link';
import MissionSection from './MissionSection';
import AnimatedHeader from './AnimatedHeader';
import Image from 'next/image';
import { 
  FaCertificate, 
  FaShieldAlt, 
  FaAward, 
  FaCheck, 
  FaHardHat,
  FaUsers,
  FaHandshake 
} from 'react-icons/fa';
import CallToAction from '../../components/sections/CallToAction';

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-900">
      <AnimatedHeader />

      {/* Our Story Section */}
      <section className="relative bg-gray-50 py-20 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Story Card */}
          <article className="bg-blue-900 text-white p-8 md:p-10 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold mb-4 text-yellow-300">Our Story</h2>
            <p className="mb-4 text-base leading-relaxed text-blue-100">
              Founded in 2010, Crestly Construction emerged during Zimbabwe's construction boom with a 
              clear mission: deliver reliable, skilled execution where the industry lacked consistency.
            </p>
            <p className="mb-4 text-base leading-relaxed text-blue-100">
              Starting from a small workshop with just 3 employees, we've grown into a nationally 
              recognized construction company with <strong className="text-white">50+ skilled professionals</strong> 
              specializing in civil engineering, industrial construction, and steel fabrication.
            </p>
            <p className="mb-4 text-base leading-relaxed text-blue-100">
              Our commitment to safety, quality, and timely delivery has earned us partnerships with 
              major corporations and government entities across Zimbabwe.
            </p>
            <div className="border-l-4 border-yellow-300 pl-4 mt-6">
              <p className="text-yellow-100 italic">
                "We don't just build structures; we build lasting relationships and contribute to 
                Zimbabwe's infrastructure development."
              </p>
              <p className="text-sm text-blue-200 mt-2">- Founder, Crestly Construction</p>
            </div>
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

      {/* Certifications & Credentials Section <section className="bg-white py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Certifications & Credentials
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-yellow-100 p-4 rounded-lg mb-4">
                <FaCertificate className="text-yellow-600 text-3xl mx-auto" />
              </div>
              <h3 className="font-semibold">Licensed Contractor</h3>
              <p className="text-sm text-gray-600">Zimbabwe Construction License</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 p-4 rounded-lg mb-4">
                <FaShieldAlt className="text-yellow-600 text-3xl mx-auto" />
              </div>
              <h3 className="font-semibold">Safety Certified</h3>
              <p className="text-sm text-gray-600">OSHA Compliance</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 p-4 rounded-lg mb-4">
                <FaAward className="text-yellow-600 text-3xl mx-auto" />
              </div>
              <h3 className="font-semibold">Award Winning</h3>
              <p className="text-sm text-gray-600">National Construction Awards</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 p-4 rounded-lg mb-4">
                <FaHardHat className="text-yellow-600 text-3xl mx-auto" />
              </div>
              <h3 className="font-semibold">Qualified Team</h3>
              <p className="text-sm text-gray-600">Certified Engineers & Artisans</p>
            </div>
          </div>
        </div>
      </section> */}
      

      {/* Statistics/Achievements Section <section className="bg-blue-900 text-white py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-yellow-300">
            Our Track Record
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-yellow-300 mb-2">100+</div>
              <p className="text-blue-100">Projects Completed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-300 mb-2">10+</div>
              <p className="text-blue-100">Years Experience</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-300 mb-2">50+</div>
              <p className="text-blue-100">Happy Clients</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-300 mb-2">0</div>
              <p className="text-blue-100">Safety Incidents</p>
            </div>
          </div>
        </div>
      </section> */}
      

      {/* Team/Leadership Section <section className="bg-gray-50 py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Our Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">John Doe</h3>
              <p className="text-yellow-600 font-medium mb-2">Project Manager</p>
              <p className="text-sm text-gray-600">15+ years in construction management</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Jane Smith</h3>
              <p className="text-yellow-600 font-medium mb-2">Lead Engineer</p>
              <p className="text-sm text-gray-600">Expert in civil & industrial projects</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Michael Brown</h3>
              <p className="text-yellow-600 font-medium mb-2">Operations Director</p>
              <p className="text-sm text-gray-600">Logistics & safety specialist</p>
            </div>
          </div>
        </div>
      </section> */}
      

      {/* Safety & Quality Commitment Section <section className="bg-white py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                <FaShieldAlt className="inline-block text-yellow-600 mr-3" />
                Safety First
              </h2>
              <p className="text-gray-600 mb-4">
                Safety is non-negotiable at Crestly Construction. We maintain a zero-incident 
                policy through rigorous training, proper equipment, and strict adherence to 
                international safety standards.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  Regular safety training for all personnel
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  OSHA-compliant safety protocols
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  Comprehensive insurance coverage
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                <FaAward className="inline-block text-yellow-600 mr-3" />
                Quality Assurance
              </h2>
              <p className="text-gray-600 mb-4">
                Every project undergoes rigorous quality control processes to ensure we deliver 
                structures that stand the test of time and exceed client expectations.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  Multi-stage quality inspections
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  Premium materials and equipment
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  Post-completion warranty support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>*/}
      

      {/* Mission & Values Section */}
      <MissionSection />

      {/* Call-to-Action Section */}
      <CallToAction />
    </main>
  );
}
