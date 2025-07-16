import Link from 'next/link';
import MissionSection from './MissionSection';
import AnimatedHeader from './AnimatedHeader';
import OurStorySection from './OurStorySection';
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
      <OurStorySection />
      <MissionSection />
      <CallToAction />
    </main>
  );
}
