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
    <div className="relative min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100 py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* LEFT SIDE */}
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold text-blue-900 mb-4"
          >
            Let’s Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-700 mb-8 max-w-xl leading-relaxed"
          >
            Planning a project or have questions? Fill out the form below and our team will get back to you shortly.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="w-full max-w-xl bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-slate-200 space-y-5"
            onSubmit={handleSubmit}
          >
            <input type="text" name="honey" className="hidden" value={form.honey} onChange={e => setForm(f => ({ ...f, honey: e.target.value }))} />

            {/* Form Inputs */}
            {['name', 'email', 'subject'].map((field, i) => (
              <label key={i} className="block text-sm font-semibold text-slate-800 uppercase tracking-wide">
                {field}
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  className={`mt-2 w-full px-4 py-3 rounded-lg border text-sm placeholder-gray-400 ${errors[field as keyof typeof errors] ? 'border-red-400 bg-red-50' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  placeholder={`Your ${field === 'email' ? 'email address' : field}`}
                  value={form[field as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [field]: sanitize(e.target.value) }))}
                />
                {errors[field as keyof typeof errors] && (
                  <p className="text-xs text-red-500 mt-1">{errors[field as keyof typeof errors]}</p>
                )}
              </label>
            ))}

            <label className="block text-sm font-semibold text-slate-800 uppercase tracking-wide">
              Message
              <textarea
                rows={5}
                className={`mt-2 w-full px-4 py-3 rounded-lg border text-sm placeholder-gray-400 ${errors.message ? 'border-red-400 bg-red-50' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
                placeholder="Tell us about your project or inquiry..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: sanitize(e.target.value) }))}
              />
              {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              {submitting ? (
                <>
                  <FaSpinner className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <FaHardHat /> Send Message
                </>
              )}
            </button>

            {success && (
              <div className="flex items-center justify-center gap-2 text-green-600 font-medium mt-3">
                <FaCheckCircle className="text-lg" />
                Message sent successfully!
              </div>
            )}
          </motion.form>
        </div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="w-full lg:w-[40%] bg-white/90 rounded-2xl shadow-xl p-6 border border-slate-200"
        >
          <h2 className="text-2xl font-semibold text-blue-900 mb-6">Contact Information</h2>

          <div className="space-y-6 text-sm text-slate-700">
            <div>
              <h3 className="font-semibold text-blue-800 flex items-center gap-2 mb-1"><FaMapMarkerAlt /> Office Location</h3>
              <p>123 Construction Avenue<br />Industrial Park, Suite 456<br />Cityname, ST 12345</p>
            </div>

            <div>
              <h3 className="font-semibold text-blue-800 flex items-center gap-2 mb-1"><FaPhoneAlt /> Phone</h3>
              <p><a href="tel:+15551234567" className="text-blue-700 hover:underline">+1 (555) 123-4567</a></p>
              <p><span className="font-semibold text-red-600">Emergency:</span> <a href="tel:+15557654321" className="text-blue-700 hover:underline">+1 (555) 765-4321</a></p>
            </div>

            <div>
              <h3 className="font-semibold text-blue-800 flex items-center gap-2 mb-1"><FaEnvelope /> Email</h3>
              <p><a href="mailto:info@crestlyconstruction.com" className="text-blue-700 hover:underline">info@crestlyconstruction.com</a></p>
              <p><a href="mailto:sales@crestlyconstruction.com" className="text-blue-700 hover:underline">sales@crestlyconstruction.com</a></p>
            </div>

            <div>
              <h3 className="font-semibold text-blue-800 flex items-center gap-2 mb-1"><FaClock /> Business Hours</h3>
              <p>Mon – Fri: 8:00 AM – 6:00 PM</p>
              <p>Sat – Sun: 9:00 AM – 1:00 PM</p>
            </div>

            <div className="mt-6">
              <h3 className="text-blue-800 font-semibold flex items-center gap-2 mb-2">📍 Find Us on Map</h3>
              <div className="w-full h-64 rounded-lg overflow-hidden border border-slate-200">
                <iframe
                  title="Crestly Construction Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890123!2d-74.0059413!3d40.7589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzMyLjAiTiA3NMKwMDAnMjEuNCJX!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  className="w-full h-full"
                  loading="lazy"
                  style={{ border: 0 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
