'use client';

import { motion, Variants } from 'framer-motion';
import { FaTools, FaHandshake, FaUsers } from 'react-icons/fa';


const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  },
  exit: { opacity: 0, transition: { duration: 0.5 } }
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },

  visible: (i: number) => ({
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
  },
  exit: { opacity: 0, y: 30, transition: { duration: 0.5 } }
};

const iconVariants: Variants = {
  hover: {
    rotate: [0, -10, 8, -5, 0],
    transition: {
      duration: 0.8
    }
  }
};


export default function WorkWithUsSection() {
  return (
    <motion.section

      className="relative py-12 md:py-20 px-4 md:px-12 w-[95%] mx-auto text-center isolate"
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{

            backgroundImage: `linear-gradient(to right, #1e3a8a 1px, transparent 1px), linear-gradient(to bottom, #1e3a8a 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-blue-100/80" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h2

          className="text-2xl md:text-4xl font-extrabold text-blue-900 mb-4 md:mb-6 tracking-tight leading-snug"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8 }
            },
            exit: { opacity: 0, y: 20, transition: { duration: 0.4 } }
          }}
        >
          Our Mission & Values
        </motion.h2>

        <motion.p

          className="text-lg md:text-xl text-blue-700 max-w-3xl mx-auto mb-8 md:mb-14 leading-relaxed px-4"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.8 }
            },
            exit: { opacity: 0, transition: { duration: 0.4 } }
          }}
        >
          To empower Zimbabwe's infrastructure growth by delivering world-class construction services rooted in
          quality, safety, and innovation.
        </motion.p>

        <motion.div

          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
        >
          {[
            {
              title: 'Craftsmanship',

              icon: <FaTools size={28} className="text-blue-800 md:w-8 md:h-8" />,
              description:
                "We don't cut corners. Every project reflects our engineering precision and structural integrity.",
            },
            {
              title: 'Accountability',

              icon: <FaHandshake size={28} className="text-blue-800 md:w-8 md:h-8" />,
              description:
                'We meet deadlines, respect budgets, and own every phase of the construction process.',
            },
            {
              title: 'Community Impact',

              icon: <FaUsers size={28} className="text-blue-800 md:w-8 md:h-8" />,
              description:
                'We hire local, train local, and build with sustainability and social responsibility in mind.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}

              className="group relative border border-gray-200 bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 md:p-6 shadow-sm overflow-hidden"
              variants={cardItemVariants}
              custom={i}
              whileHover="hover"
              exit="exit"
            >
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

                  className="flex justify-center mb-3 md:mb-4"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  {item.icon}
                </motion.div>


                <h3 className="text-xl md:text-2xl font-bold text-blue-900 mb-2">{item.title}</h3>
                <motion.p

                  className="text-gray-700 text-sm md:text-base leading-relaxed"
                  initial={{ opacity: 0.8 }}
                  whileHover={{
                    opacity: 1,

                    color: '#1e3a8a'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {item.description}
                </motion.p>
              </div>

              <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-blue-200/20 blur-sm" />
              <div className="absolute -top-4 -left-4 w-6 h-6 rounded-full bg-amber-200/20 blur-sm" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
