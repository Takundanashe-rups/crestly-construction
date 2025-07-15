'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaHardHat, FaSpinner } from 'react-icons/fa';
import Link from 'next/link';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', honey: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; subject?: string; message?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function sanitize(input: string) {
    return input.replace(/</g, '<').replace(/>/g, '>').trim();
  }

  function validate() {
    const errs: typeof errors = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    else if (!/^[a-zA-Z\s'-]{2,50}$/.test(form.name.trim())) errs.name = "Enter a valid name.";
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errs.email = 'Enter a valid email.';
    if (!form.subject.trim()) errs.subject = 'Subject is required.';
    else if (form.subject.trim().length < 3) errs.subject = 'Subject must be at least 3 characters.';
    else if (form.subject.trim().length > 100) errs.subject = 'Subject must be less than 100 characters.';
    if (!form.message.trim()) errs.message = 'Message is required.';
    else if (form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters.';
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    if (form.honey) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '', honey: '' });
    }, 1200);
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100">
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
              Contact Us  
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed drop-shadow-lg font-medium">
              Home » Contact Us
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section with proper spacing */}
      <div className="py-20 md:py-24 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-20">
          {/* LEFT SIDE */}
          <div className="flex-1">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-6"
            >
              Let's Get in Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-gray-700 mb-10 max-w-xl leading-relaxed text-lg"
            >
              Planning a project or have questions? Fill out the form below and our team will get back to you shortly.
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="w-full max-w-xl bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-slate-200 space-y-6"
              onSubmit={handleSubmit}
            >
              <input type="text" name="honey" className="hidden" value={form.honey} onChange={e => setForm(f => ({ ...f, honey: e.target.value }))} />

              {/* Form Inputs */}
              {['name', 'email', 'subject'].map((field, i) => (
                <label key={i} className="block text-sm font-semibold text-slate-800 uppercase tracking-wide">
                  {field}
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    className={`mt-3 w-full px-4 py-4 rounded-lg border text-sm placeholder-gray-400 ${errors[field as keyof typeof errors] ? 'border-red-400 bg-red-50' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all`}
                    placeholder={`Your ${field === 'email' ? 'email address' : field}`}
                    value={form[field as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [field]: sanitize(e.target.value) }))}
                  />
                  {errors[field as keyof typeof errors] && (
                    <p className="text-xs text-red-500 mt-2">{errors[field as keyof typeof errors]}</p>
                  )}
                </label>
              ))}

              <label className="block text-sm font-semibold text-slate-800 uppercase tracking-wide">
                Message
                <textarea
                  rows={6}
                  className={`mt-3 w-full px-4 py-4 rounded-lg border text-sm placeholder-gray-400 ${errors.message ? 'border-red-400 bg-red-50' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-vertical`}
                  placeholder="Tell us about your project or inquiry..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: sanitize(e.target.value) }))}
                />
                {errors.message && <p className="text-xs text-red-500 mt-2">{errors.message}</p>}
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] disabled:hover:scale-100"
              >
                {submitting ? (
                  <>
                    <FaSpinner className="animate-spin text-yellow-600" /> Sending...
                  </>
                ) : (
                  <>
                    <FaHardHat className="text-yellow-600" /> Send Message
                  </>
                )}
              </button>

              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-2 text-green-600 font-medium mt-4 p-3 bg-green-50 rounded-lg border border-green-200"
                >
                  <FaCheckCircle className="text-lg text-yellow-600" />
                  Message sent successfully!
                </motion.div>
              )}
            </motion.form>
          </div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="w-full lg:w-[40%] bg-white/90 rounded-2xl shadow-xl p-8 border border-slate-200"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-blue-900 mb-8">Contact Information</h2>

            <div className="space-y-8 text-sm text-slate-700">
              <div>
                <h3 className="font-semibold text-blue-800 flex items-center gap-2 mb-3 text-base"><FaMapMarkerAlt className="text-yellow-600" /> Office Location</h3>
                <p className="leading-relaxed">123 Construction Avenue<br />Industrial Park, Suite 456<br />Cityname, ST 12345</p>
              </div>

              <div>
                <h3 className="font-semibold text-blue-800 flex items-center gap-2 mb-3 text-base"><FaPhoneAlt className="text-yellow-600" /> Phone</h3>
                <p className="mb-2"><a href="tel:+15551234567" className="text-blue-700 hover:underline transition-colors">+1 (555) 123-4567</a></p>
                <p><span className="font-semibold text-red-600">Emergency:</span> <a href="tel:+15557654321" className="text-blue-700 hover:underline transition-colors">+1 (555) 765-4321</a></p>
              </div>

              <div>
                <h3 className="font-semibold text-blue-800 flex items-center gap-2 mb-3 text-base"><FaEnvelope className="text-yellow-600" /> Email</h3>
                <p className="mb-2"><a href="mailto:info@crestlyconstruction.com" className="text-blue-700 hover:underline transition-colors">info@crestlyconstruction.com</a></p>
                <p><a href="mailto:sales@crestlyconstruction.com" className="text-blue-700 hover:underline transition-colors">sales@crestlyconstruction.com</a></p>
              </div>

              <div>
                <h3 className="font-semibold text-blue-800 flex items-center gap-2 mb-3 text-base"><FaClock className="text-yellow-600" /> Business Hours</h3>
                <p className="mb-1">Mon – Fri: 8:00 AM – 6:00 PM</p>
                <p>Sat – Sun: 9:00 AM – 1:00 PM</p>
              </div>

              <div className="mt-8">
                <h3 className="text-blue-800 font-semibold flex items-center gap-2 mb-4 text-base">📍 Find Us on Map</h3>
                <div className="w-full h-72 rounded-lg overflow-hidden border border-slate-200 shadow-md">
                  <iframe
                    title="Crestly Construction Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890123!2d-74.0059413!3d40.7589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzMyLjAiTiA3NMKwMDAnMjEuNCJX!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                    className="w-full h-full"
                    loading="lazy"
                    style={{ border: 0 }}
                  />

                {/*for real adress *src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d386.3215773378974!2d32.59690125659042!3d-19.0065825929912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2szw!4v1752481457614!5m2!1sen!2szw"
                    className="w-full h-full"
                    loading="lazy"
                    style={{ border: 0 }}
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  /> */}

                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <CallToAction className="bg-gradient-to-br from-white via-blue-50 to-slate-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-950" />
    </div>
  );
}
