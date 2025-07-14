'use client';
import React from 'react';
import { FaTools, FaPencilRuler, FaDraftingCompass, FaHardHat, FaHammer, FaRedo, FaComments, FaCogs } from 'react-icons/fa';
import { motion } from 'framer-motion';
import CallToAction from '../../../components/sections/CallToAction';

const services = [
  { icon: <FaPencilRuler className="text-yellow-600 text-3xl" />, title: 'Quotations', description: 'Transparent and competitive project estimates tailored to your budget.' },
  { icon: <FaDraftingCompass className="text-yellow-600 text-3xl" />, title: 'Architectural Design', description: 'Custom design solutions that combine functionality and beauty.' },
  { icon: <FaTools className="text-yellow-600 text-3xl" />, title: 'Plan Drawing', description: 'Accurate technical drawings for construction and regulatory compliance.' },
  { icon: <FaHardHat className="text-yellow-600 text-3xl" />, title: 'Bricklaying', description: 'Expert bricklayers delivering durable and precise masonry work.' },
  { icon: <FaHammer className="text-yellow-600 text-3xl" />, title: 'Construction', description: 'Full-scale construction for residential, commercial, and industrial projects.' },
  { icon: <FaRedo className="text-yellow-600 text-3xl" />, title: 'Renovations', description: 'Revamp and modernize spaces with minimal disruption and expert care.' },
  { icon: <FaComments className="text-yellow-600 text-3xl" />, title: 'Consultancy', description: 'Professional guidance to navigate permits, budgets, and timelines.' },
  { icon: <FaCogs className="text-yellow-600 text-3xl" />, title: 'Other Services', description: 'We handle all related construction activities tailored to your goals.' },
];

export default function ConstructionServices() {
  return (
    <>
      {/* Hero Section - matching boiler-making page height */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/80 md:from-black/70 md:via-black/50 md:to-black/90" />
        <div className="absolute inset-0 bg-[url('/images/contactus-banner.jpg')] bg-cover bg-center" />

        <div className="relative z-20 container mx-auto px-4 py-24 md:py-32 flex items-center justify-center min-h-[400px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
              Construction Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed drop-shadow-lg font-medium">
              Home » Construction
            </p>
          </motion.div>
        </div>
      </section>
      {/* Existing content below */}
      <section className="bg-gray-50 py-16 px-6 lg:px-12">
        {/* Heading */}
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800">Our Construction Services</h1>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              From concept to completion, we deliver professional and reliable services across all construction phases.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 text-center border border-gray-200"
              >
                <div className="mb-4 flex justify-center">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <CallToAction />
        </div>
      </section>
    </>
  );
}

