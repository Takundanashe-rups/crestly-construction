'use client';
import React from 'react';
import { FaTools, FaPencilRuler, FaDraftingCompass, FaHardHat, FaHammer, FaRedo, FaComments, FaCogs } from 'react-icons/fa';

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
    <section className="bg-gray-50 py-16 px-6 lg:px-12">
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
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-2">Need help with your next project?</h2>
          <p className="text-gray-600 mb-4">Contact us today for a free consultation or quotation.</p>
          <a
            href="/contact"
            className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-medium px-6 py-3 rounded-full shadow-md transition"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}

