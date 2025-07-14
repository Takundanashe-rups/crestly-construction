'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaArrowRight, FaTools, FaIndustry, FaCog, FaShieldAlt } from 'react-icons/fa';
import Link from 'next/link';
import CallToAction from '../../../components/sections/CallToAction';


const services = {
  Fabrication: {
    icon: FaTools,
    items: [
      "Custom Metal Fabrication",
      "Structural Steel Fabrication", 
      "Sheet Metal Bending & Cutting",
      "Precision Boiler Component Manufacturing"
    ],
    color: "from-blue-500 to-blue-600"
  },
  Welding: {
    icon: FaIndustry,
    items: [
      "MIG, TIG & Stick Welding",
      "On-site Welding Services",
      "Pipe Welding & Repairs",
      "High-Pressure Vessel Welding"
    ],
    color: "from-blue-600 to-blue-700"
  },
  Rigging: {
    icon: FaCog,
    items: [
      "Inspection",
      "Maintenance of lifting equipment ",
      "Installation" 
    ],
    color: "from-blue-400 to-blue-500"
  },
  Consulting: {
    icon: FaShieldAlt,
    items: [
      "Design & Planning Assistance",
      "Project Estimations",
      "Compliance & Safety Guidance",
      "Efficiency Optimization"
    ],
    color: "from-blue-500 to-blue-700"
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function BoilerMakingPage() {
  const [open, setOpen] = useState<string | null>('Fabrication');

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100">
      {/* Hero Section */}
   <section className="relative overflow-hidden">
  
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/80 md:from-black/70 md:via-black/50 md:to-black/90" />
          <div className="absolute inset-0 bg-[url('/images/Bioler-making.jpg')] bg-cover bg-center" />

          <div className="relative z-20 container mx-auto px-4 py-24 md:py-32 flex items-center justify-center min-h-[400px]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-4xl mx-auto"
              >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
              Sheet & Metal Fabrication  
            </h1>
                  <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed drop-shadow-lg font-medium">
              Home
        »  Sheet & Metal Fabrication
            </p>
       
    </motion.div>
          </div>
</section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-white/90">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">Expertise</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              From fabrication to consulting, our professional services are tailored to meet the demands of construction, manufacturing, and industrial operations.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Services Accordion */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {Object.entries(services).map(([category, data]) => {
                const isOpen = open === category;
                const IconComponent = data.icon;
                
                return (
                  <motion.div
                    key={category}
                    variants={itemVariants}
                    className="group"
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300">
                      <div className={`absolute inset-0 bg-gradient-to-r ${data.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                      
                      <button
                        onClick={() => setOpen(isOpen ? null : category)}
                        className="relative w-full flex items-center justify-between p-6 text-left transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${data.color} shadow-lg`}>
                            <IconComponent className="text-white text-xl" />
                          </div>
                          <span className="text-2xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
                            {category}
                          </span>
                        </div>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-blue-700"
                        >
                          <FaChevronDown className="text-xl" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6">
                              <div className="grid gap-3 ml-16">
                                {data.items.map((item, index) => (
                                  <motion.div
                                    key={item}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group/item"
                                  >
                                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
                                    <span className="text-slate-700 group-hover/item:text-blue-900 transition-colors">
                                      {item}
                                    </span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Image and CTA Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-8"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="/images/Bioler-making.jpg"
                    alt="Professional boiler making and welding services"
                    className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-8 p-8 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl"
              >
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  Why Choose Crestly Construction?
                </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Our skilled professionals and cutting-edge tools guarantee precision and excellence across all services. We are committed to delivering quality-assured solutions with round-the-clock support to ensure your project success.
                  </p>

                
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 rounded-lg bg-blue-50">
                      <div className="text-2xl font-bold text-blue-700">100%</div>
                      <div className="text-sm text-slate-600">Quality Assured</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-blue-50">
                      <div className="text-2xl font-bold text-blue-700">24/7</div>
                      <div className="text-sm text-slate-600">Support Available</div>
                    </div>
                </div>


                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Get Started <FaArrowRight />
                  </button>
                  <Link href="/contact" className="flex-1">
                    <button className="w-full border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300">
                      Contact Us
                    </button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <CallToAction />
    </div>
  );
}
