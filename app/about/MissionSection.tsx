'use client';

import { motion, Variants } from 'framer-motion';
import { FaTools, FaHandshake, FaUsers } from 'react-icons/fa';

// Floating decorative animation circle
const FloatingCircle = ({
  className,
  delay,
  y = 25,
  x = 10,
  scale = 1.05,
  duration = 5,
}: {
  className: string;
  delay: number;
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
}) => (
  <motion.div
    aria-hidden="true"
    className={className}
    initial={{ opacity: 1 }}
    animate={{
      y: [0, y, 0],
      x: [0, x, 0],
      scale: [1, scale, 1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    }}
  />
);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
  hover: {
    y: -10,
    scale: 1.03,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

const iconVariants: Variants = {
  hover: {
    rotate: [0, -10, 8, -5, 0],
    transition: { duration: 0.8 },
  },
};

export default function MissionSection() {
  return (
    <motion.section
      className="relative py-20 px-6 md:px-12 w-[95%] mx-auto text-center isolate"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #1e40af 1px, transparent 1px), linear-gradient(to bottom, #1e40af 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-blue-100/80" />

        {/* Static Circles */}
        {[
          'top-20 right-10 w-24 h-24 border-[10px] border-blue-200/40',
          'top-32 left-16 w-20 h-20 border-[8px] border-blue-300/30',
          'bottom-32 right-20 w-28 h-28 border-[12px] border-blue-100/50',
          'top-1/3 right-1/4 w-18 h-18 border-[6px] border-amber-300/40',
          'bottom-1/3 left-1/3 w-22 h-22 border-[10px] border-amber-100/35',
          'top-1/2 left-8 w-16 h-16 border-[7px] border-amber-200/25',
          'bottom-16 right-1/3 w-20 h-20 border-[9px] border-amber-300/30',
          'top-16 right-1/2 w-14 h-14 border-[5px] border-amber-200/40',
          'bottom-1/4 left-1/5 w-16 h-16 border-[8px] border-blue-300/35',
        ].map((className, i) => (
          <div
            key={i}
            aria-hidden="true"
            className={`absolute rounded-full ${className}`}
          />
        ))}

        {/* Animated Floating Circles */}
        <FloatingCircle className="absolute top-1/3 left-1/4 w-8 h-8 bg-amber-400/10 rounded-full" delay={0} />
        <FloatingCircle className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-blue-400/10 rounded-full" delay={0.5} y={20} x={-8} />
        <FloatingCircle className="absolute top-1/2 left-1/3 w-10 h-10 bg-blue-300/15 rounded-full" delay={1} y={30} x={15} scale={1.1} />
        <FloatingCircle className="absolute bottom-1/4 left-1/5 w-7 h-7 bg-amber-300/12 rounded-full" delay={1.5} y={18} x={-12} />
        <FloatingCircle className="absolute top-1/4 right-1/3 w-9 h-9 bg-blue-500/8 rounded-full" delay={2} y={22} x={8} />
        <FloatingCircle className="absolute bottom-1/2 right-1/5 w-5 h-5 bg-amber-500/15 rounded-full" delay={2.5} y={25} x={-10} />
        <FloatingCircle className="absolute top-3/4 left-1/2 w-12 h-12 bg-blue-200/10 rounded-full" delay={3} y={35} x={20} scale={1.2} />
        <FloatingCircle className="absolute top-1/6 left-3/4 w-6 h-6 bg-amber-400/12 rounded-full" delay={3.5} y={15} x={-15} />
        <FloatingCircle className="absolute bottom-1/6 left-2/3 w-8 h-8 bg-blue-400/12 rounded-full" delay={4} y={20} x={12} />
        <FloatingCircle className="absolute top-1/5 right-1/6 w-7 h-7 bg-amber-300/8 rounded-full" delay={0.8} y={18} x={8} scale={0.9} />
        <FloatingCircle className="absolute bottom-1/5 right-2/3 w-9 h-9 bg-blue-300/10 rounded-full" delay={1.2} y={22} x={-14} />
        <FloatingCircle className="absolute top-2/3 right-1/8 w-8 h-8 bg-amber-200/12 rounded-full" delay={1.8} y={28} x={16} scale={1.15} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-extrabold text-blue-900 mb-3 tracking-tight leading-snug"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8 },
            },
          }}
        >
          Our Mission & Values
        </motion.h2>
        <motion.div
          className="h-1 w-16 bg-amber-400 mx-auto mb-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.5, ease: 'easeInOut' }}
        />

        <motion.p
          className="text-xl text-blue-700 max-w-3xl mx-auto mb-14 leading-relaxed"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.8 },
            },
          }}
        >
          To empower Zimbabwe's infrastructure growth by delivering world-class construction services rooted in
          quality, safety, and innovation.
        </motion.p>

        {/* Cards */}
        <motion.div className="grid md:grid-cols-3 gap-8" variants={containerVariants}>
          {[
            {
              title: 'Craftsmanship',
              icon: <FaTools size={24} />,
              description: "We don't cut corners. Every project reflects our engineering precision and structural integrity.",
            },
            {
              title: 'Accountability',
              icon: <FaHandshake size={24} />,
              description: 'We meet deadlines, respect budgets, and own every phase of the construction process.',
            },
            {
              title: 'Community Impact',
              icon: <FaUsers size={24} />,
              description: 'We hire local, train local, and build with sustainability and social responsibility in mind.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="group relative border border-gray-200 bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-sm overflow-hidden"
              variants={cardItemVariants}
              custom={i}
              whileHover="hover"
            >
              {/* Hover Light Strip */}
              <div className="absolute inset-0 rounded-xl overflow-hidden" aria-hidden="true">
                <motion.div
                  className="absolute w-[150%] h-[40px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
                  initial={{ top: '100%' }}
                  whileHover={{
                    top: '-10%',
                    transition: { duration: 0.6 },
                  }}
                />
              </div>

              <div className="relative z-10">
                <motion.div
                  className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-200 transition"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">{item.title}</h3>
                <motion.p
                  className="text-gray-700"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1, color: '#1e40af' }}
                  transition={{ duration: 0.3 }}
                >
                  {item.description}
                </motion.p>
              </div>

              {/* Floating decorations */}
              <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-blue-200/20 blur-sm" aria-hidden="true" />
              <div className="absolute -top-4 -left-4 w-6 h-6 rounded-full bg-amber-200/20 blur-sm" aria-hidden="true" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
