'use client';

import { motion, Variants } from 'framer-motion';
import { FaTools, FaHandshake, FaUsers } from 'react-icons/fa';

// Define proper types for variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: i * 0.2,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }),
  hover: {
    y: -10,
    scale: 1.03,
    transition: { 
      duration: 0.4,
      ease: [0.25, 1, 0.5, 1]
    }
  }
};

const iconVariants: Variants = {
  hover: {
    rotate: [0, -10, 8, -5, 0],
    transition: {
      duration: 0.8
    }
  }
};

export default function MissionSection() {
  return (
    <motion.section
      className="relative py-20 px-6 md:px-12 w-[95%] mx-auto text-center isolate"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Enhanced Background with circles only */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #1e40af 1px, transparent 1px),
                              linear-gradient(to bottom, #1e40af 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-blue-100/80" />
        
        {/* Static decorative circles - tripled */}
        <div className="absolute top-20 right-10 w-24 h-24 rounded-full border-[10px] border-blue-200/40" />
        <div className="absolute top-32 left-16 w-20 h-20 rounded-full border-[8px] border-blue-300/30" />
        <div className="absolute bottom-32 right-20 w-28 h-28 rounded-full border-[12px] border-blue-100/50" />
        <div className="absolute top-1/3 right-1/4 w-18 h-18 rounded-full border-[6px] border-amber-300/40" />
        <div className="absolute bottom-1/3 left-1/3 w-22 h-22 rounded-full border-[10px] border-amber-100/35" />
        <div className="absolute top-1/2 left-8 w-16 h-16 rounded-full border-[7px] border-amber-200/25" />
        <div className="absolute bottom-16 right-1/3 w-20 h-20 rounded-full border-[9px] border-amber-300/30" />
        <div className="absolute top-16 right-1/2 w-14 h-14 rounded-full border-[5px] border-amber-200/40" />
        <div className="absolute bottom-1/4 left-1/5 w-16 h-16 rounded-full border-[8px] border-blue-300/35" />

        {/* Animated floating circles - tripled with enhanced movement */}
        <motion.div 
          className="absolute top-1/3 left-1/4 w-8 h-8 bg-amber-400/10 rounded-full"
          animate={{
            y: [0, -25, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-blue-400/10 rounded-full"
          animate={{
            y: [0, 20, 0],
            x: [0, -8, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/3 w-10 h-10 bg-blue-300/15 rounded-full"
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/5 w-7 h-7 bg-amber-300/12 rounded-full"
          animate={{
            y: [0, 18, 0],
            x: [0, -12, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
        <motion.div 
          className="absolute top-1/4 right-1/3 w-9 h-9 bg-blue-500/8 rounded-full"
          animate={{
            y: [0, -22, 0],
            x: [0, 8, 0],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute bottom-1/2 right-1/5 w-5 h-5 bg-amber-500/15 rounded-full"
          animate={{
            y: [0, 25, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
        />
        <motion.div 
          className="absolute top-3/4 left-1/2 w-12 h-12 bg-blue-200/10 rounded-full"
          animate={{
            y: [0, -35, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        <motion.div 
          className="absolute top-1/6 left-3/4 w-6 h-6 bg-amber-400/12 rounded-full"
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3.5
          }}
        />
        <motion.div 
          className="absolute bottom-1/6 left-2/3 w-8 h-8 bg-blue-400/12 rounded-full"
          animate={{
            y: [0, -20, 0],
            x: [0, 12, 0],
          }}
          transition={{
            duration: 5.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
        <motion.div 
          className="absolute top-1/5 right-1/6 w-7 h-7 bg-amber-300/8 rounded-full"
          animate={{
            y: [0, -18, 0],
            x: [0, 8, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8
          }}
        />
        <motion.div 
          className="absolute bottom-1/5 right-2/3 w-9 h-9 bg-blue-300/10 rounded-full"
          animate={{
            y: [0, 22, 0],
            x: [0, -14, 0],
          }}
          transition={{
            duration: 5.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2
          }}
        />
        <motion.div 
          className="absolute top-2/3 right-1/8 w-8 h-8 bg-amber-200/12 rounded-full"
          animate={{
            y: [0, -28, 0],
            x: [0, 16, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.8
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-extrabold text-blue-900 mb-6 tracking-tight leading-snug"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.8 } 
            }
          }}
        >
          Our Mission & Values
        </motion.h2>
        
        <motion.p
          className="text-xl text-blue-700 max-w-3xl mx-auto mb-14 leading-relaxed"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { delay: 0.3, duration: 0.8 } 
            }
          }}
        >
          To empower Zimbabwe's infrastructure growth by delivering world-class construction services rooted in
          quality, safety, and innovation.
        </motion.p>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {[
            {
              title: 'Craftsmanship',
              icon: <FaTools size={32} className="text-blue-800" />,
              description:
                "We don't cut corners. Every project reflects our engineering precision and structural integrity.",
            },
            {
              title: 'Accountability',
              icon: <FaHandshake size={32} className="text-blue-800" />,
              description:
                'We meet deadlines, respect budgets, and own every phase of the construction process.',
            },
            {
              title: 'Community Impact',
              icon: <FaUsers size={32} className="text-blue-800" />,
              description:
                'We hire local, train local, and build with sustainability and social responsibility in mind.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="group relative border border-gray-200 bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-sm overflow-hidden"
              variants={cardItemVariants}
              custom={i}
              whileHover="hover"
            >
              {/* Animated border effect */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <motion.div 
                  className="absolute w-[150%] h-[40px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
                  initial={{ top: "100%" }}
                  whileHover={{
                    top: "-10%",
                    transition: { duration: 0.6 }
                  }}
                />
              </div>
              
              <div className="relative z-10">
                <motion.div 
                  className="flex justify-center mb-4"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  {item.icon}
                </motion.div>
                
                <h3 className="text-2xl font-bold text-blue-900 mb-2">{item.title}</h3>
                <motion.p 
                  className="text-gray-700"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ 
                    opacity: 1,
                    color: "#1e40af"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.description}
                </motion.p>
              </div>
              
              {/* Floating dots decoration */}
              <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-blue-200/20 blur-sm" />
              <div className="absolute -top-4 -left-4 w-6 h-6 rounded-full bg-amber-200/20 blur-sm" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}