'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

import React, { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '', honey: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Basic sanitization (client-side, for demonstration)
  function sanitize(input: string) {
    return input.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();
  }

  function validate() {
    const errs: typeof errors = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    else if (!/^[a-zA-Z\s'-]{2,50}$/.test(form.name.trim())) errs.name = "Enter a valid name (letters, spaces, - or ').";
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errs.email = 'Enter a valid email address.';
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
    // Honeypot check
    if (form.honey) return;
    setSubmitting(true);
    // Simulate submission to be replaced with real API call)
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setForm({ name: '', email: '', message: '', honey: '' });
    }, 1200);
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10 px-4">
      {/* Home Button */}
     

      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-blue-900 text-center mb-4 drop-shadow-sm"
      >
        Contact Us
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="text-lg text-blue-800 text-center mb-8 max-w-xl"
      >
        We'd love to hear from you! Fill out the form below and our team will get back to you shortly.
      </motion.p>

      {/* Contact Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="w-full max-w-md bg-white/90 rounded-xl shadow-lg p-8 flex flex-col gap-4 border border-blue-100"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        {/* Honeypot field  */}
        <input
          type="text"
          name="honey"
          value={form.honey}
          onChange={e => setForm(f => ({ ...f, honey: e.target.value }))}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />
        <label className="block text-blue-900 font-semibold">Name
          <input
            type="text"
            required
            minLength={2}
            maxLength={50}
            autoComplete="off"
            className={`mt-1 w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-400' : 'border-blue-200'} focus:ring-2 focus:ring-blue-200 outline-none transition`}
            placeholder="Your Name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: sanitize(e.target.value) }))}
            aria-invalid={!!errors.name}
          />
          {errors.name && <span className="text-xs text-red-500 ml-1">{errors.name}</span>}
        </label>
        <label className="block text-blue-900 font-semibold">Email
          <input
            type="email"
            required
            autoComplete="off"
            className={`mt-1 w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-400' : 'border-blue-200'} focus:ring-2 focus:ring-blue-200 outline-none transition`}
            placeholder="you@email.com"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: sanitize(e.target.value) }))}
            aria-invalid={!!errors.email}
          />
          {errors.email && <span className="text-xs text-red-500 ml-1">{errors.email}</span>}
        </label>
        <label className="block text-blue-900 font-semibold">Message
          <textarea
            required
            rows={4}
            minLength={10}
            maxLength={1000}
            className={`mt-1 w-full px-4 py-2 rounded-lg border ${errors.message ? 'border-red-400' : 'border-blue-200'} focus:ring-2 focus:ring-blue-200 outline-none transition`}
            placeholder="How can we help you?"
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: sanitize(e.target.value) }))}
            aria-invalid={!!errors.message}
          />
          {errors.message && <span className="text-xs text-red-500 ml-1">{errors.message}</span>}
        </label>
        <button
          type="submit"
          disabled={submitting}
          className={`mt-2 w-full py-2 rounded-lg font-bold transition ${submitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-900 hover:bg-blue-800 text-white'}`}
        >
          {submitting ? 'Sending...' : 'Send Message'}
        </button>
        {success && <div className="text-green-600 text-center mt-2">Thank you for contacting us!</div>}
      </motion.form>
    </div>
  );
}